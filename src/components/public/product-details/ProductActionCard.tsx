import Link from "next/link";
import {
  ShieldCheck,
  Headphones,
  Clock3,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

interface Props {
  category: string;
  slug: string;
}

export default function ProductActionCard({
  category,
  slug
}: Props) {
  return (
    <div className="sticky top-24">
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg">
        <div className="bg-[#0F2747] p-5 text-white">
          <h3 className="text-xl font-bold">
            Need Assistance?
          </h3>

          <p className="mt-2 text-sm text-slate-200">
            Talk with our automation experts.
          </p>
        </div>

        <div className="p-5">
          <div className="mb-5 rounded-2xl bg-slate-50 p-4">
            <p className="text-xs text-slate-500">
              Product Category
            </p>

            <p className="mt-1 font-semibold text-[#0F2747]">
              {category}
            </p>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-2">
              <ShieldCheck
                size={18}
                className="text-green-600"
              />
              Quality Assured
            </div>

            <div className="flex items-center gap-2">
              <Headphones
                size={18}
                className="text-blue-600"
              />
              Technical Support
            </div>

            <div className="flex items-center gap-2">
              <Clock3
                size={18}
                className="text-orange-600"
              />
              Fast Response
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <Link
              href={`/products/${slug}#enquiry`}
              className="block rounded-xl bg-[#0F2747] px-5 py-3 text-center font-medium text-white transition hover:bg-[#173865]"
           >
              Request Quote
            </Link>

            <a
              href="https://wa.me/918766918892"
              target="_blank"
              className="flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3 font-medium text-white transition hover:bg-orange-600"
            >
              <FaWhatsapp />
              WhatsApp Expert
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}