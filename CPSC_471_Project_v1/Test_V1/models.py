from django.db import models

# Create your models here.

# Student model logic. Only 1 student can belong to a single school. 

class Student (models.Model):
    student_id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    date_of_birth = models.DateField(null = True, blank = False)
    age = models.PositiveIntegerField(null= True, blank = False)
    phone_number = models.CharField(max_length=20, null = True, blank = True)
    address = models.CharField(max_length =100, null =True, blank = True)
    ##Date_of_enrollment (some students move mid year)
    ##Date_of_enrollment = models.DateField(null =True, blank True)
    
    school = models.ForeignKey(
        School, on_delete= models.CASCADE,
        related_name = "students"
    )
    def __str__(self):
        return f"{self.student_id}"
    
class Teacher (models.Model):
    teacher_id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    ## date_of_birth = models.DateField(null = True, blank = False)
    age = models.PositiveIntegerField(null= True, blank = False)
    phone_number = models.CharField(max_length=20, null = True, blank = True)
    address = models.CharField(max_length =100, null =True, blank = True)
    ##Date_of_hire (Teacher are hired all throughout the year)
    ##Date_of_hire = models.DateField(null =True, blank True)
    
    school = models.ForeignKey(
        School, on_delete= models.CASCADE,
        related_name = "Teachers"
    )
    def __str__(self):
        return f"{self.teacher_id}"
    
class SchoolMember (models.Model):
    member_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=20, null = True, blank = True)
    address = models.CharField(max_length =100, null =True, blank = True)
    principle = models.BooleanField(
        default=False, 
        help_text = "check if principal exists"
    )
    
    def __str__(self):
        return self.name

class Class (models.Model):
    Class_id = models.AutoField(primary_key=True)
    class_name = models.CharField(max_length=100)
    description = models.TextField(null= True, blank = False)
    Capacity = models.PositiveIntegerField(default = 30)
    location = models.CharField(max_length =100, null =True, blank = True)
    
    #Many to 1 relationship
    Teacher = models.ForeignKey(
        Teacher, on_delete= models.CASCADE,
        related_name = "Classes"
    )
    def __str__(self):
        return self.class_name
    
class Schedule (models.Model):
    schedule_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, unique=True)
    
    start_time = models.TimeField(null=True, blank=True)
    end_time = models.TimeField(null=True, blank=True)
    info = models.TextField(null=True, blank=True, help_text="Additional schedule details")
    

    classes = models.ManyToManyField(
        Class,
        related_name='schedules',
        blank=True
    )
    def __str__(self):
        return self.name
    

## Weak Entities Now ##

class Classroom(models.Model):
    id = models.AutoField(primary_key=True)  # For Django's internal needs
    class_ref = models.ForeignKey(
        Class,
        on_delete=models.CASCADE,
        related_name='classrooms'
    )

    # Partial key
    room_number = models.CharField(max_length=50)

    class Meta:
        # Composite key: each (class_ref, room_number) is unique
        unique_together = (('class_ref', 'room_number'),)

    def __str__(self):
        return f"Classroom {self.room_number} for Class: {self.class_ref.class_name}"


class Subject(models.Model):
    id = models.AutoField(primary_key=True)
    class_ref = models.ForeignKey(
        Class,
        on_delete=models.CASCADE,
        related_name='subjects'
    )
    subject_code = models.CharField(max_length=50)
    name = models.CharField(max_length=100, null=True, blank=True)
    description = models.TextField(null=True, blank=True)

    class Meta:
        unique_together = (('class_ref', 'subject_code'),)

    def __str__(self):
        return f"Subject {self.name or self.subject_code} in {self.class_ref.class_name}"


class Grade(models.Model):
    id = models.AutoField(primary_key=True)
    student = models.ForeignKey(
        Student,
        on_delete=models.CASCADE,
        related_name='grades'
    )
    subject = models.ForeignKey(
        Subject,
        on_delete=models.CASCADE,
        related_name='grades'
    )
    letter_grade = models.CharField(max_length=2, null=True, blank=True) # A+ - D-. Hence 2 limit. 
    percentage = models.FloatField(null=True, blank=True)
    ##score = models.str("") ## Not sure what this is suppose to say. I'm guessing its "str based off letter"

    class Meta:
        # If each Student can only have one Grade per Subject:
        unique_together = (('student', 'subject'),)

    def __str__(self):
        return f"{self.student} - {self.subject} -> {self.letter_grade or 'N/A'}"


class Feedback(models.Model):
    id = models.AutoField(primary_key=True)
    student = models.ForeignKey(
        Student,
        on_delete=models.CASCADE,
        related_name='feedback'
    )
    subject = models.ForeignKey(
        Subject,
        on_delete=models.CASCADE,
        related_name='feedback'
    )
    comment = models.TextField()
   ## date_given = models.DateField(auto_now_add=True) ##Thoughts on this

    # Do we have exactly 1 feedback allowed per (student, subject)
    # class Meta:
    #     unique_together = (('student', 'subject'),)

    def __str__(self):
        return f"Feedback for {self.student} on {self.subject}"

##NEED TO FIGURE OUT how to associate workbank to letter = word. 
class IndividualizedProgramPlan(models.Model):
    id = models.AutoField(primary_key=True)
    student = models.ForeignKey(
        Student,
        on_delete=models.CASCADE,
        related_name='iips'
    )
    specified_disability = models.CharField(max_length=100, null=True, blank=True)
    goals = models.TextField(null=True, blank=True)
    educational_aids = models.TextField(null=True, blank=True)
    creation_date = models.DateField(auto_now_add=True)
    last_updated = models.DateField(auto_now=True)

    ## Do we lose IIP if a student leaves the school? I think yes
    class Meta:
      
      unique_together = (('student', 'individualizedprogramplan'),)

    def __str__(self):
        return f"IIP for {self.student} (ID: {self.id})"


class Attendance(models.Model):
    id = models.AutoField(primary_key=True)
    student = models.ForeignKey(
        Student,
        on_delete=models.CASCADE,
        related_name='attendance_records'
    )

    # For reference, we might track attendance in a specific Class:
    class_ref = models.ForeignKey(
        Class,
        on_delete=models.CASCADE,
        related_name='attendance_records'
    )

    # Is attendance tied to Schedule or Class???
    # schedule_ref = models.ForeignKey(Schedule, on_delete=models.CASCADE, related_name='attendance_records')

    date = models.DateField()
    presence = models.BooleanField(default=True)
    notes = models.CharField(max_length=255, null=True, blank=True, help_text="Late? Reason for absence?")

    class Meta:
        unique_together = (('student', 'class_ref', 'date'),)

    def __str__(self):
        status = "Present" if self.presence else "Absent"
        return f"{self.student} in {self.class_ref} on {self.date} -> {status}"