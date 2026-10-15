import {SignIn} from "@/components/SignIn";
import {pageMetadata} from "@/lib/site-metadata";
import "./sign-in.css";
export const metadata=pageMetadata("Sign in","Return to the RunwayMemo weekly decision memo. An illustrative sign-in preview; no live accounts or email delivery.","/sign-in");
export default function SignInPage(){return <SignIn/>}
