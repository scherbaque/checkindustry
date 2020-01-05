import {path} from "./constants";

export default function Auth() {
    const url = "/api/v1/auth/linkedin";

	window.location.replace(path + url);
    // fetch(path + url)
    //     .then(e => e.json())
    //     .then(d => console.log("d = ", d))
    //     .catch(error => console.log(error));
}
