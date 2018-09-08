import { URLSearchParams } from '@angular/http';

export function urlencode (data:Object) :string {
    let urlSearchParams = new URLSearchParams();
    for (let key in data)
        urlSearchParams.append(key, data[key]);
    return urlSearchParams.toString();
}
