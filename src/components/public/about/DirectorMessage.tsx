import Image from "next/image";
import { Quote, Award, BadgeCheck, Users, CheckCircle2 } from "lucide-react";

export default function DirectorMessage() {
  return (
    <section className="bg-white py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Left Side */}

          <div>
            <span
              className="
                inline-flex
                rounded-full
                bg-orange-50
                px-4
                py-2
                text-sm
                font-semibold
                text-orange-600
              "
            >
              Director's Message
            </span>

            <h2
              className="
                mt-6
                text-3xl
                font-bold
                leading-tight
                text-[#0F2747]
              "
            >
              Leadership Driven By Innovation, Quality & Customer Success
            </h2>

            {/* Quote */}

            <div
              className="
                mt-4
                rounded-2xl
                border-l-4
                border-orange-500
                bg-orange-50
                p-6
              "
            >
              <Quote size={24} className="mb-4 text-orange-500" />

              <p
                className="
                  text-md
                  italic
                  leading-8
                  text-slate-700
                "
              >
                Our vision is to become one of India's most trusted Industrial Entrance Automation companies by delivering reliable, innovative and future-ready engineering solutions.
              </p>
            </div>

            {/* Director */}

            <div className="mt-8">
              <h3
                className="
                  text-2xl
                  font-bold
                  text-[#0F2747]
                "
              >
                Mr. Narendra Khamkar
              </h3>

              <p className="mt-1 text-orange-600 font-medium">
                Aven Automation Leadership Team
              </p>
            </div>

            {/* Description */}

            <div
              className="
                mt-2
                space-y-6
                text-md
                leading-8
                text-slate-600
              "
            >
              <p>
                At Aven Automation, we believe every industry deserves dependable, efficient and intelligent automation solutions. We provide Automatic Gates, Boom Barriers, Industrial Doors, High Speed Doors, Dock Levelers, Dock Shelters and customized Industrial Entrance Automation systems for factories, warehouses and commercial facilities.
              </p>

              <p>
                Every project is approached with careful planning, engineering
                precision and a customer-first mindset. From consultation to
                commissioning, our team works closely with clients to ensure
                long-term operational success.
              </p>

              <p>
                We continuously invest in technology, innovation and skilled
                professionals to build long-lasting relationships based on
                trust, transparency and consistent performance.
              </p>
            </div>
          </div>

          {/* Right Side */}

          <div className="relative">
            <div
              className="
                overflow-hidden
                rounded-[32px]
                border
                border-slate-200
                bg-slate-100
                shadow-xl
              "
            >
              <div className="relative h-[620px]">
                {/* Replace with your Director image */}
                <Image
                  src="/director.jpg"
                  alt="Managing Director"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
