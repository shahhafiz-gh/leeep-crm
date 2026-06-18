import { Icon } from '@iconify/react'
import type { SchoolData } from '@/types/school.types'

const inputClass =
  'w-full border border-tb-border rounded-lg px-4 py-3 text-tb-heading placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-tb-primary-400 focus:border-tb-primary-400 transition-colors bg-white'
const labelClass = 'block text-sm font-semibold text-tb-heading mb-2'
const stepTitleClass = 'text-xl font-bold text-tb-heading mb-5 border-b border-tb-border pb-3'

function Field({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
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
    <div className="border border-tb-border p-5 rounded-xl bg-tb-primary-50/30">
      <h4 className="text-lg font-bold text-tb-heading mb-4">{title}</h4>
      <div className="space-y-4">
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

export default function ApplicationForm({ data }: { data: SchoolData }) {
  return (
    <section id="admission-application-form" className="py-16 md:py-24 bg-tb-primary-50/30">
      <div className="max-w-5xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-tb-primary-400 text-sm font-bold uppercase tracking-widest mb-3">Apply Now</p>
          <h2 className="text-3xl md:text-4xl font-bold text-tb-heading mb-3">Start Your Application</h2>
          <p className="text-tb-body text-lg max-w-2xl mx-auto leading-relaxed">
            Please fill out the details below to begin the admission process.
          </p>
        </div>

        <form className="bg-white rounded-2xl border border-tb-border p-6 md:p-10 space-y-12">
          {/* 1. Student Information */}
          <div>
            <h3 className={stepTitleClass}>1. Student Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <Field label="First Name" type="text" placeholder="Enter first name" />
              <Field label="Last Name" type="text" placeholder="Enter last name" />
              <Field label="Date of Birth" type="date" />
              <div>
                <label className={labelClass}>Grade Applying For</label>
                <select className={inputClass} defaultValue="">
                  <option value="" disabled>Select Grade</option>
                  {GRADES.map((g) => <option key={g}>{g}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* 2. Previous Academic Details */}
          <div>
            <h3 className={stepTitleClass}>2. Previous Academic Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <Field label="Previous School Name" type="text" placeholder="Enter school name" />
              <Field label="Board" type="text" placeholder="e.g., JKBOSE, CBSE" />
              <Field label="Grade Attended" type="text" placeholder="e.g., Grade 4" />
              <Field label="GPA/Percentage" type="text" placeholder="Enter GPA or %" />
              <Field label="Year of Passing" type="text" placeholder="e.g., 2024" />
              <Field label="Reason for Leaving" type="text" placeholder="Reason for leaving" />
              <div className="lg:col-span-3">
                <label className={labelClass}>Transfer Certificate (TC) Availability</label>
                <div className="flex flex-wrap items-center gap-4">
                  <label className="flex items-center gap-2 cursor-pointer text-tb-body text-sm">
                    <input className="accent-tb-primary-400" name="tc_availability" type="radio" value="yes" />
                    Yes, available
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-tb-body text-sm">
                    <input className="accent-tb-primary-400" name="tc_availability" type="radio" value="no" />
                    No, to be submitted later
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Parent/Guardian Information */}
          <div>
            <h3 className={stepTitleClass}>3. Parent/Guardian Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <ParentCard title="Father's Details" />
              <ParentCard title="Mother's Details" />
            </div>
            <label className="flex items-center gap-2 text-sm font-semibold text-tb-heading cursor-pointer mt-4">
              <input className="accent-tb-primary-400" type="checkbox" />
              Provide Local Guardian Details (if applicable)
            </label>
          </div>

          {/* 4. Contact & Address Details */}
          <div>
            <h3 className={stepTitleClass}>4. Contact &amp; Address Details</h3>
            <div className="space-y-5">
              <div>
                <label className={labelClass}>Current Address</label>
                <textarea className={inputClass} placeholder="Enter full current address" rows={3} />
              </div>
              <label className="flex items-center gap-2 text-sm font-semibold text-tb-heading cursor-pointer">
                <input defaultChecked className="accent-tb-primary-400" type="checkbox" />
                Permanent address is same as current address
              </label>
            </div>
          </div>

          {/* 5. Health & Special Requirements */}
          <div>
            <h3 className={stepTitleClass}>5. Health &amp; Special Requirements</h3>
            <div className="space-y-5">
              {[
                'Does the child have any pre-existing medical conditions?',
                'Does the child have any allergies?',
                'Does the child require any special educational support?',
              ].map((q, i) => (
                <div key={q}>
                  <label className={labelClass}>{q}</label>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 cursor-pointer text-tb-body text-sm">
                      <input className="accent-tb-primary-400" name={`health-${i}`} type="radio" value="yes" />
                      Yes
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer text-tb-body text-sm">
                      <input defaultChecked className="accent-tb-primary-400" name={`health-${i}`} type="radio" value="no" />
                      No
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 6. Document Upload */}
          <div>
            <h3 className={stepTitleClass}>6. Document Upload</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {UPLOADS.map((upload) => (
                <div
                  key={upload.title}
                  className="border-2 border-dashed border-tb-border rounded-xl p-6 text-center bg-tb-primary-50/30 hover:bg-tb-primary-50/60 transition-colors cursor-pointer"
                >
                  <Icon icon={upload.icon} className="text-tb-primary-400 text-4xl mx-auto mb-2" />
                  <p className="text-sm font-bold text-tb-heading mb-1">{upload.title}</p>
                  <p className="text-xs text-slate-400">{upload.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 7. Additional Information */}
          <div>
            <h3 className={stepTitleClass}>7. Additional Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>How did you hear about us?</label>
                <select className={inputClass} defaultValue="">
                  <option value="" disabled>Select Option</option>
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
          <div className="bg-tb-primary-50/40 p-6 rounded-xl border border-tb-border">
            <h3 className="text-xl font-bold text-tb-heading mb-4">Declaration</h3>
            <p className="text-tb-body text-sm mb-4 leading-relaxed">
              I hereby declare that the information provided above is true and correct to the best of my knowledge. I understand that any false information may lead to the cancellation of admission.
            </p>
            <div className="flex flex-col gap-3 mb-6">
              <label className="flex items-start gap-2 text-sm text-tb-heading cursor-pointer">
                <input className="accent-tb-primary-400 mt-1" type="checkbox" />
                <span>I agree to abide by the rules and regulations of {data.name}.</span>
              </label>
              <label className="flex items-start gap-2 text-sm text-tb-heading cursor-pointer">
                <input className="accent-tb-primary-400 mt-1" type="checkbox" />
                <span>I consent to the use of my child&apos;s photographs/videos for school promotional purposes.</span>
              </label>
            </div>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-tb-primary-400 text-white font-semibold rounded-full hover:bg-tb-primary-500 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Submit Application
              <span>→</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
