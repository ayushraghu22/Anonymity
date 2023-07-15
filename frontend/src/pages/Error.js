import { useRouteError } from "react-router-dom";
import PageContent from "../components/PageContent";
import MainNavigation from "../components/MainNavigation";
import errorPng from "../components/auth/images/error.png"

function ErrorPage() {
  const error = useRouteError();

  let title = "An error occured!";
  let message = "Something went wrong.";

  if (error.status === 401) {
    message = "Unauthorized user!";
  }

  if (error.status === 400) {
    title = "Not Found!";
    message = "Could not find resource or page.";
  }

  if (error && error.data && error.data.message) message = error.data.message;

  return (
    <>
      <MainNavigation />
      <PageContent title={title} message={message}>
      <img src={errorPng} alt="error-png" style={{width:"65%"}} />
      </PageContent>
    </>
  );
}

export default ErrorPage;
