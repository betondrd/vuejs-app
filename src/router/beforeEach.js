import store from "@/store";

export default async (to, from, next) => {
  document.title = `${to.name} - App`;

  const publicPages = ["/auth"];
  const authRequired = !publicPages.includes(to.path);
  const authenticated = store.getters.isLogged;

  if (authRequired && !authenticated) return next("/auth");

  if (!authRequired && authenticated) return next("/");

  next();
};
