import React from 'react'

const admission = {
  title: 'Manipal Online University Admission Process',
  description: `For Manipal university online registration, the candidate can directly contact collegecosmos.
Other than that, the candidates can follow the following simple process:

• Fill out the Application Form: The candidate will receive a Manipal university online form on the university website. Fill in your basic, education & work experience–related details in Manipal university online application form.
• Fee Payment: In this next step, you must pay the admission fee for the first semester/ year or full program to secure your spot for the chosen program at Manipal Online University.
• Document Upload: After filling out the application form and fee payment, you must upload the supporting documents & submit your application. These documents might include ID proof, educational certificates and mark sheets, and work experience, if any. Before submitting the application form, the candidate must verify their details.
• University Approval: After all this, await the notification from the university. The university’s officials will evaluate your documents to confirm your admission.`
}

const examination= {
  title: 'Manipal Online University Examination Pattern',
  description: `The Manipal online exam is divided into two parts, which are Final Assessment Test (FAT). The examination evaluation pattern will be divided into two parts:

Continuous Assessment Test (CAT) covering 30% weightage. This test includes the different quizzes, assignments, mid-term tests, and case studies that the students attempt.

Final Assessment Test (FAT) covering 70% weightage. This test includes the computer-based proctored examination in an online mode or at an exam center.

All students who have registered for a particular course are eligible to write the CAT and FAT (Theory/Lab) of that course. However, the student is not allowed to give exams if they are caught in shortage of attendance or any acts of indiscipline.`
}

const ExaminationSection = () => {
  return (
    <section id="examination" className="space-y-6 p-6">
      {/* Admission Process */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">{admission.title}</h2>
        <p className="text-sm text-muted-foreground">{admission.description.split('\n')[0]}</p>
        <ul className="list-disc ml-6 text-sm text-muted-foreground space-y-1">
          <li>Fill out the Application Form: The candidate will receive a Manipal University online form on the university website.</li>
          <li>Fee Payment: In this next step, you must pay the admission fee for the first semester.</li>
          <li>Document Upload: After filling the application form and fee payment, upload the supporting documents & submit your application.</li>
          <li>University Approval: After this, await the notification from the university.</li>
        </ul>
      </div>

      {/* Examination Pattern */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">{examination.title}</h2>
        <p className="text-sm text-muted-foreground">{examination.description.split('\n')[0]}</p>
        <ul className="list-disc ml-6 text-sm text-muted-foreground space-y-1">
          <li>
            <strong>Continuous Assessment Test (CAT)</strong> covering 30% weightage. Tests include quizzes, assignments and mid-term tests.
          </li>
          <li>
            <strong>Final Assessment Test (FAT)</strong> covering 70% weightage. Tests include computer-based proctored examination.
          </li>
        </ul>
        <p className="text-xs text-muted-foreground">
          All students who have registered for a particular course are eligible to write the CAT and FAT of that course. However, the student is not allowed to give exams if they are caught in shortage of attendance or any acts of indiscipline.
        </p>
      </div>
    </section>
  );
}

export default ExaminationSection