import PageContent from "./PageContent";
import landingImage from "../components/auth/images/landing1.gif";

function HomePage() {
  return (
    <PageContent
      title="Welcome to Anonymity."
      message="This is a site where you can share your view, experience or confessions. No one gonna judge you as your posts will be anonymous."
    >
      <p className="lead fs-5">Register and Enjoi !!!</p>
      <div className="mt-2">
        <img src={landingImage} alt="Responsive img" className="img-fluid"/>
      </div>
    </PageContent>
  );
}

export default HomePage;
