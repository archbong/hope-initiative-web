import { LinkButton } from "../home/LinkButton";

interface AboutCTAProps {
  title: string;
  description?: string;
  donateButtonText?: string;
  volunteerButtonText?: string;

}

const AboutCTA = ({ title, description, donateButtonText, volunteerButtonText }: AboutCTAProps) => {
  return (
    <section className="py-20 bg-gradient-to-br from-orange-600 to-amber-500 relative overflow-hidden">
      <div className="container-custom text-center">
        <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
          {title}
        </h2>
        <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
          {description}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <LinkButton to="/donate" variant="dark" className="px-12 py-5 shadow-2xl shadow-orange-600/20">
            {donateButtonText || "Fund a Project"}
          </LinkButton>
          <LinkButton to="/volunteer" variant="outline-white" className="px-12 py-5">
            {volunteerButtonText || "Join the Network"}
          </LinkButton>
        </div>
      </div>
    </section>
  );
}

export default AboutCTA;