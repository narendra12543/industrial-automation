import Link from "next/link";
import {
  ShieldCheck,
  Wrench,
  Headphones,
  Truck,
  Cog,
  BadgeCheck,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    title: "Aven Industrial automationExpertise",
    description:
      "Years of experience delivering PLC, SCADA, HMI, VFD and complete Aven  Industrial automationfor modern manufacturing industries.",
    icon: Cog,
  },
  {
    title: "Premium Quality Products",
    description:
      "We supply reliable automation products and components that meet industrial standards for safety, durability and long-term performance.",
    icon: ShieldCheck,
  },
  {
    title: "Customized Engineering Solutions",
    description:
      "Every project is carefully engineered according to customer requirements, production processes and future expansion plans.",
    icon: Wrench,
  },
  {
    title: "Technical Support",
    description:
      "Our engineering team provides prompt technical assistance, troubleshooting and after-sales support whenever required.",
    icon: Headphones,
  },
  {
    title: "On-Time Project Delivery",
    description:
      "Efficient planning, project management and quality execution help us deliver automation projects within committed timelines.",
    icon: Truck,
  },
  {
    title: "Trusted Business Partner",
    description:
      "We focus on building long-term customer relationships through transparency, quality workmanship and dependable service.",
    icon: BadgeCheck,
  },
];

export default function WhyChooseUsAbout() {
  return (
    <section className="bg-slate-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}

        <div className="mx-auto max-w-3xl text-center">
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
            Why Choose Us
          </span>

          <h2
            className="
              mt-5
              text-3xl
              font-bold
              text-[#0F2747]
            "
          >
            Why Industries Trust Our
            Aven Industrial automation
          </h2>

          <p
            className="
              mt-4
              text-md
              leading-8
              text-slate-600
            "
          >
            We combine engineering expertise,
            quality products and reliable
            customer support to deliver
            Aven Industrial automation
            that improve productivity,
            efficiency and operational safety.
          </p>
        </div>

        {/* Cards */}

        <div className="mt-6 grid gap-8 md:grid-cols-2 l:grid-cols-3">
          {features.map((item) => (
            <div
              key={item.title}
              className="
                group
                rounded-3xl
                border
                border-slate-200
                bg-white
                p-8
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-2
                hover:border-[#0F2747]
                hover:shadow-2xl
              "
            >
              {/* Icon */}

              <div
                className="
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-2xl
                  bg-[#0F2747]/10
                  text-[#0F2747]
                  transition
                  duration-300
                  group-hover:bg-[#0F2747]
                  group-hover:text-white
                "
              >
                <item.icon size={32} />
              </div>

              {/* Content */}

              <h3
                className="
                  mt-6
                  text-xl
                  font-bold
                  text-[#0F2747]
                "
              >
                {item.title}
              </h3>

              <p
                className="
                  mt-4
                  leading-7
                  text-slate-600
                "
              >
                {item.description}
              </p>

              {/* Bottom */}

              <div className="mt-6">
                <span
                  className="
                    inline-flex
                    items-center
                    gap-2
                    font-semibold
                    text-[#0F2747]
                    transition
                    group-hover:gap-3
                  "
                >
                  Learn More

                  <ArrowRight size={18} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}