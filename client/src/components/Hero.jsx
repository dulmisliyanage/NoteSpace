import heroIllustration from "../assets/notespace-hero.png";

function Hero() {
  return (
    <section className="hero">
      <h1>Your ideas deserve a space.</h1>
      <p>Capture your thoughts and keep your notes organized.</p>

      <img
        src={heroIllustration}
        alt="Illustration of a student organizing notes"
        className="hero-illustration"
      />
    </section>
  );
}

export default Hero;
