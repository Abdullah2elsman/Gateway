import { Permissions } from "./Permissions";

export const checkNotifications = () => {
  let permissions = Permissions();
  let Notifications = Object.values(permissions?.notification);
  let vaild = false;

  for (let i = 0; i < Notifications.length; i++) {
    if (Notifications[i]) {
      vaild = true;
    }
  }

  return vaild;
};

const checkPermission = (key) => {
  let permissions = Permissions();
  let check = [permissions];

  let vaild = false;

  check?.map((permission) => {
    key?.children?.map((child) => {
      if (permission[key.name][child]) {
        vaild = true;
      }
      return null;
    });
  });

  return vaild;
};

export default checkPermission;
