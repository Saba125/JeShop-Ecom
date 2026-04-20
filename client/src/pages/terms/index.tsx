import React from 'react'

const Section = ({ title, children }) => (
  <div className="mb-8">
    <h2 className="text-xl font-semibold mb-3 border-b pb-2">{title}</h2>
    <div className="text-sm text-gray-600 leading-7">{children}</div>
  </div>
)

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-2xl p-8">

        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          წესები და პირობები
        </h1>

        <p className="text-gray-600 mb-6 leading-7">
          აღნიშნული ვებგვერდი წარმოადგენს შპს athome.ge (ს/კ #) საკუთრებას.
          საიტით სარგებლობით თქვენ ეთანხმებით ხელშეკრულების პირობებს.
        </p>

        <Section title="1. ზოგადი პირობები">
          <p className="mb-3">
            <strong>ტერმინები:</strong> ჩვენ – შპს athome.ge; თქვენ – მომხმარებელი.
          </p>

          <ul className="list-disc pl-5 space-y-2">
            <li>ხართ სრულწლოვანი ან გაქვთ შესაბამისი ნებართვა</li>
            <li>წარმოადგენთ ზუსტ ინფორმაციას</li>
            <li>არ დაარღვევთ საავტორო უფლებებს</li>
            <li>დაიცავთ ანგარიშის უსაფრთხოებას</li>
            <li>არ გამოიყენებთ სხვის მონაცემებს</li>
            <li>არ დააზიანებთ სისტემას</li>
          </ul>
        </Section>

        <Section title="2. რეგისტრაცია">
          <p>
            პროდუქტის შეძენა შესაძლებელია რეგისტრაციით ან მის გარეშე.
            თქვენ პასუხისმგებელი ხართ თქვენს ანგარიშზე.
          </p>
        </Section>

        <Section title="3. მომსახურების პირობები">
          <p className="mb-3">
            მომსახურება ხელმისაწვდომია საქართველოში.
          </p>

          <ul className="list-disc pl-5 space-y-2">
            <li>ინფორმაცია შეიძლება შეიცვალოს წინასწარი გაფრთხილების გარეშე</li>
            <li>არ ვიძლევით უწყვეტი მუშაობის გარანტიას</li>
            <li>შესაძლებელია ინფორმაციის გადაცემა პარტნიორებთან</li>
          </ul>

          <p className="mt-4">
            <strong>პასუხისმგებლობა:</strong> კომპანია არ აგებს პასუხს ტექნიკურ პრობლემებზე.
          </p>
        </Section>

        <Section title="4. მომხმარებლის ინფორმაცია">
          <p className="mb-3">
            შეიძლება შეგროვდეს პირადი და არაპირადი ინფორმაცია.
          </p>

          <ul className="list-disc pl-5 space-y-2">
            <li>პირადი: სახელი, ელფოსტა და სხვა</li>
            <li>არაპირადი: IP, ბრაუზერი</li>
            <li>ბარათის მონაცემები არ ინახება</li>
          </ul>

          <p className="mt-4">
            ვიყენებთ უსაფრთხოების ზომებს, თუმცა სრული უსაფრთხოება ვერ არის გარანტირებული.
          </p>
        </Section>

        <Section title="5. ონლაინ შესყიდვა">
          <p>
            შეკვეთები მიიღება 24/7. გამოიყენეთ კატეგორიები ან ძებნა.
          </p>
        </Section>

        <Section title="6. მიწოდება">
          <ul className="list-disc pl-5 space-y-2">
            <li>12:00-მდე – იმავე დღეს</li>
            <li>16:00-მდე – მომდევნო დღეს</li>
            <li>შაბათი – ორშაბათს</li>
            <li>რეგიონები – 1-3 დღე</li>
          </ul>

          <p className="mt-3">
            შეკვეთის გაუქმება შესაძლებელია 3 დღეში.
          </p>
        </Section>

        <Section title="7. საკონტაქტო ინფორმაცია">
          <div className="space-y-1">
            <p>Email: info@athome.ge</p>
            <p>ტელ: +995 599 09 32 09</p>
            <p>მისამართი: ვეფხისტყაოსნის ქ. #16, თბილისი</p>
          </div>
        </Section>

      </div>
    </div>
  )
}

export default TermsPage