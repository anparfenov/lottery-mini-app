import { GetLaunchParamsResponse } from "@vkontakte/vk-bridge";
import { makeAutoObservable } from "mobx";
import { RootStore } from "./rootStore";

export class AppStore {
    appLaunchParams: GetLaunchParamsResponse | null;
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        makeAutoObservable(this)
    }

    setAppLaunchParams(launchParams: GetLaunchParamsResponse) {
        this.appLaunchParams = launchParams;
    }

    extractHeaders() {
        if (this.appLaunchParams) {
            return {
                'X-VK-ID': String(this.appLaunchParams.vk_user_id),
                'X-Sign': this.appLaunchParams.sign,    
            }
        }
        return {};
    }
}