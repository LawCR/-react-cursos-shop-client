import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

// Esto devuelve de manera automatizada el context del authContext
// eslint-disable-next-line
export default () => useContext(AuthContext)
