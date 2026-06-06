import { LinkButton } from './LinkButton';
import { CheckCircle2 } from 'lucide-react';

const HomeCTA = () => {
  return (
    <section className="mx-4 sm:mx-6 lg:mx-8 mb-24">
      <div className="max-w-7xl mx-auto bg-gradient-to-br from-orange-600 to-amber-500 rounded-3xl shadow-xl shadow-orange-600/10 text-white overflow-hidden relative py-16 px-8 sm:px-12 lg:p-20">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
            Ready to Spark Real Institutional Reform?
          </h2>
          <p className="text-base sm:text-lg opacity-90 font-medium leading-relaxed max-w-xl mx-auto">
            Your continuous systemic involvement guarantees rapid outreach pipeline generation for hundreds of local communities.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            {/* Dark button with inline icon component passed as a prop */}
            <LinkButton to="/volunteer" variant="dark" Icon={CheckCircle2}>
              Onboard as Volunteer
            </LinkButton>

            {/* Transparent bordered button */}
            <LinkButton to="/contact" variant="outline-white">
              Corporate Inquiries
            </LinkButton>
          </div>

        </div>
      </div>
    </section>
  );
}

export default HomeCTA;