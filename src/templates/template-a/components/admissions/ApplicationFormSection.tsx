import { Icon } from '@iconify/react'
import type { SchoolData } from '@/types/school.types'

const inputClass =
  'border border-ta-outline-variant rounded-lg px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-ta-primary focus:border-ta-primary bg-ta-surface-container-lowest text-ta-on-surface font-(family-name:--font-ta-body-md) text-ta-body-md transition-colors'
const labelClass = 'font-(family-name:--font-ta-label-md) text-ta-label-md text-ta-on-surface font-bold'
const stepTitleClass =
  'font-(family-name:--font-ta-h3) text-2xl text-ta-on-surface mb-5 border-b border-ta-outline-variant pb-3'

function Field({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className={labelClass}>{label}</label>
      <input className={inputClass} {...props} />
    </div>
  )
}

const GRADES = ['Nursery', 'LKG', 'UKG', 'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10']

const UPLOADS = [
  { icon: 'lucide:file-up', title: 'Birth Certificate', desc: 'PDF, JPG, PNG up to 5MB' },
  { icon: 'lucide:camera', title: 'Passport Size Photo', desc: 'JPG, PNG up to 2MB' },
  { icon: 'lucide:file-text', title: 'Previous Year Report Card', desc: 'PDF up to 5MB' },
  { icon: 'lucide:id-card', title: 'Aadhar Card', desc: 'PDF up to 5MB' },
]

function ParentCard({ title }: { title: string }) {
  return (
    <div className="border border-ta-outline-variant p-4 rounded-lg bg-ta-surface-container-low">
      <h4 className="font-(family-name:--font-ta-h3) text-xl text-ta-on-surface mb-3">{title}</h4>
      <div className="space-y-3">
        <Field label="Name" type="text" placeholder="Full name" />
        <Field label="Qualification" type="text" placeholder="Highest qualification" />
        <Field label="Occupation" type="text" placeholder="Occupation" />
        <Field label="Annual Income" type="text" placeholder="Annual income" />
        <Field label="Contact Number" type="tel" placeholder="Phone number" />
        <Field label="Aadhar Number" type="text" placeholder="Aadhar number" />
      </div>
    </div>
  )
}

export default function ApplicationFormSection({ data }: { data: SchoolData }) {
  return (
    <section id="admission-application-form" className="bg-ta-surface-container-lowest py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="font-(family-name:--font-ta-h2) text-3xl md:text-[40px] text-ta-on-background mb-2 tracking-tight">
            Start Your Application
          </h2>
          <p className="font-(family-name:--font-ta-body-lg) text-lg text-ta-on-surface-variant max-w-2xl mx-auto">
            Please fill out the details below to begin the admission process.
          </p>
        </div>

        <div className="bg-ta-surface-container-lowest border border-ta-outline-variant rounded-xl p-6 md:p-10 shadow-sm">
          <form className="space-y-12">
            {/* 1. Student Information */}
            <div>
              <h3 className={stepTitleClass}>1. Student Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Field label="First Name" type="text" placeholder="Enter first name" />
                <Field label="Last Name" type="text" placeholder="Enter last name" />
                <Field label="Date of Birth" type="date" />
                <div className="flex flex-col gap-1.5">
                  <label className={labelClass}>Grade Applying For</label>
                  <select className={inputClass}>
                    <option value="">Select Grade</option>
                    {GRADES.map((g) => <option key={g} value={g}>{g}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* 2. Previous Academic Details */}
            <div>
              <h3 className={stepTitleClass}>2. Previous Academic Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Field label="Previous School Name" type="text" placeholder="Enter school name" />
                <Field label="Board" type="text" placeholder="e.g., State Board, CBSE, ICSE" />
                <Field label="Grade Attended" type="text" placeholder="e.g., Grade 4" />
                <Field label="GPA/Percentage" type="text" placeholder="Enter GPA or %" />
                <Field label="Year of Passing" type="text" placeholder="e.g., 2024" />
                <Field label="Reason for Leaving" type="text" placeholder="Reason for leaving" />
                <div className="flex flex-col gap-1.5 lg:col-span-3">
                  <label className={labelClass}>Transfer Certificate (TC) Availability</label>
                  <div className="flex flex-wrap items-center gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input className="accent-ta-primary" name="tc_availability" type="radio" value="yes" />
                      <span className="font-(family-name:--font-ta-body-md) text-ta-body-md">Yes, available</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input className="accent-ta-primary" name="tc_availability" type="radio" value="no" />
                      <span className="font-(family-name:--font-ta-body-md) text-ta-body-md">No, to be submitted later</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Parent/Guardian Information */}
            <div>
              <h3 className={stepTitleClass}>3. Parent/Guardian Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ParentCard title="Father's Details" />
                <ParentCard title="Mother's Details" />
              </div>
              <div className="mt-4">
                <label className="flex items-center gap-2 font-(family-name:--font-ta-label-md) text-ta-label-md text-ta-on-surface font-bold cursor-pointer">
                  <input className="accent-ta-primary rounded" type="checkbox" />
                  <span>Provide Local Guardian Details (if applicable)</span>
                </label>
              </div>
            </div>

            {/* 4. Contact & Address Details */}
            <div>
              <h3 className={stepTitleClass}>4. Contact &amp; Address Details</h3>
              <div className="grid grid-cols-1 gap-6">
                <div className="flex flex-col gap-1.5">
                  <label className={labelClass}>Current Address</label>
                  <textarea className={inputClass} placeholder="Enter full current address" rows={3} />
                </div>
                <label className="flex items-center gap-2 font-(family-name:--font-ta-label-md) text-ta-label-md text-ta-on-surface font-bold cursor-pointer">
                  <input defaultChecked className="accent-ta-primary rounded" type="checkbox" />
                  <span>Permanent address is same as current address</span>
                </label>
              </div>
            </div>

            {/* 5. Health & Special Requirements */}
            <div>
              <h3 className={stepTitleClass}>5. Health &amp; Special Requirements</h3>
              <div className="grid grid-cols-1 gap-6">
                {[
                  'Does the child have any pre-existing medical conditions?',
                  'Does the child have any allergies?',
                  'Does the child require any special educational support?',
                ].map((q, i) => (
                  <div key={q} className="flex flex-col gap-1.5">
                    <label className={labelClass}>{q}</label>
                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input className="accent-ta-primary" name={`health-${i}`} type="radio" value="yes" />
                        <span className="font-(family-name:--font-ta-body-md) text-ta-body-md">Yes</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input defaultChecked className="accent-ta-primary" name={`health-${i}`} type="radio" value="no" />
                        <span className="font-(family-name:--font-ta-body-md) text-ta-body-md">No</span>
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 6. Document Upload */}
            <div>
              <h3 className={stepTitleClass}>6. Document Upload</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {UPLOADS.map((upload) => (
                  <div
                    key={upload.title}
                    className="border-2 border-dashed border-ta-outline-variant rounded-xl p-6 text-center bg-ta-surface-container-low hover:bg-ta-surface-container transition-colors cursor-pointer"
                  >
                    <Icon icon={upload.icon} className="text-ta-primary text-4xl mx-auto mb-2" />
                    <p className="font-(family-name:--font-ta-label-md) text-ta-label-md font-bold mb-1">{upload.title}</p>
                    <p className="font-(family-name:--font-ta-caption) text-xs text-ta-on-surface-variant">{upload.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 7. Additional Information */}
            <div>
              <h3 className={stepTitleClass}>7. Additional Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1.5">
                  <label className={labelClass}>How did you hear about us?</label>
                  <select className={inputClass}>
                    <option value="">Select Option</option>
                    <option value="website">Website/Search Engine</option>
                    <option value="social">Social Media</option>
                    <option value="referral">Friend/Family Referral</option>
                    <option value="ad">Advertisement</option>
                    <option value="walk-in">Walk-in</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <Field label="Sibling Information (if studying here)" type="text" placeholder="Name and Grade of sibling" />
              </div>
            </div>

            {/* 8. Declaration */}
            <div className="bg-ta-surface-container-low p-6 rounded-xl border border-ta-outline-variant">
              <h3 className="font-(family-name:--font-ta-h3) text-xl text-ta-on-surface mb-4">Declaration</h3>
              <p className="font-(family-name:--font-ta-body-md) text-ta-body-md text-ta-on-surface-variant mb-4">
                I hereby declare that the information provided above is true and correct to the best of my knowledge. I understand that any false information may lead to the cancellation of admission.
              </p>
              <div className="flex flex-col gap-3 mb-6">
                <label className="flex items-start gap-2 font-(family-name:--font-ta-label-md) text-ta-label-md text-ta-on-surface cursor-pointer">
                  <input className="accent-ta-primary rounded mt-1" type="checkbox" />
                  <span>I agree to abide by the rules and regulations of {data.name}.</span>
                </label>
                <label className="flex items-start gap-2 font-(family-name:--font-ta-label-md) text-ta-label-md text-ta-on-surface cursor-pointer">
                  <input className="accent-ta-primary rounded mt-1" type="checkbox" />
                  <span>I consent to the use of my child&apos;s photographs/videos for school promotional purposes.</span>
                </label>
              </div>
              <div className="flex justify-end pt-6 border-t border-ta-outline-variant">
                <button type="button" className="inline-flex items-center gap-2 bg-ta-primary-container text-ta-on-primary font-(family-name:--font-ta-label-md) text-ta-label-md rounded-full px-8 py-4 hover:scale-105 active:scale-95 transition-transform">
                  Submit Application
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
