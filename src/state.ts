import { proxy } from "valtio";

export const colorState = proxy({ value:  "green" as "green"|"orange"|"blue" })
