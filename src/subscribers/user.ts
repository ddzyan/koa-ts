import { Container } from "typedi";
import { EventSubscriber, On } from "event-dispatch";
import events from "./events";
import { Logger } from "winston";

@EventSubscriber()
export default class UserSubscriber {
  @On(events.user.signIn)
  public onUserSignIn() {
    const Logger: Logger = Container.get("logger");
    Logger.info("onUserSignIn");
  }

  @On(events.user.signUp)
  public onUserSignUp() {
    const Logger: Logger = Container.get("logger");
    Logger.info("onUserSignUp");
  }
}
