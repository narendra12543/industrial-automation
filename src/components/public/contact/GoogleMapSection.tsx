import {
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

export default function GoogleMapSection() {
  return (
    <section>
      <div className="space-y-5">

        {/* Contact Cards */}

        {/* Contact Cards */}

<div className="grid grid-cols-3 gap-3">

  {/* Call */}

  <a
    href="tel:+91 7057748540"
    className="block rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm transition hover:shadow-md"
  >
    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-[#0F2747] text-white">
      <Phone size={20} />
    </div>

    <h3 className="text-sm font-semibold text-[#0F2747]">
      Call Us
    </h3>

    <p className="mt-2 text-xs leading-5 text-slate-600">
      +91 7057748540
    </p>
  </a>

  {/* Email */}

  <div className="rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm transition hover:shadow-md">
  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-[#0F2747] text-white">
    <Mail size={20} />
  </div>

  <h3 className="text-sm font-semibold text-[#0F2747]">
    Email
  </h3>

  <div className="mt-2 space-y-1 text-xs leading-5">
    <a
      href="mailto:info@avenautomation.in"
      className="block break-all text-slate-600 hover:text-[#0F2747]"
    >
      info@avenautomation.in
    </a>

    <a
      href="mailto:sales@avenautomation.in"
      className="block break-all text-slate-600 hover:text-[#0F2747]"
    >
      sales@avenautomation.in
    </a>

    {/* <a
      href="mailto:narendra@avenautomation.in"
      className="block break-all text-slate-600 hover:text-[#0F2747]"
    >
      narendra@avenautomation.in
    </a> */}
  </div>
</div>

  {/* Address */}

  <div className="rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm transition hover:shadow-md">
    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-[#0F2747] text-white">
      <MapPin size={20} />
    </div>

    <h3 className="text-sm font-semibold text-[#0F2747]">
      Address
    </h3>

    <p className="mt-2 text-xs leading-5 text-slate-600">
      Pune,
      <br />
      Maharashtra
    </p>
  </div>

</div>

        {/* Google Map */}

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          <div className="border-b border-slate-200 bg-[#0F2747] px-5 py-3">
            <h3 className="font-semibold text-white">
              Find Us On Google Maps
            </h3>
          </div>

          <div className="h-[260px]">
            <iframe
              title="Google Map"
              src="https://www.google.com/maps?q=Pune,Maharashtra&output=embed"
              width="100%"
              height="100%"
              loading="lazy"
              className="border-0"
            />
          </div>

        </div>

      </div>
    </section>
  );
}