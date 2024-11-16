// import { User } from "../../../types";
// import cl from "./ListUser.module.css";
// import useUsers from "../../../hooks/useUsers";

// const ListUser = ({
//   setModal,
// //   users,
//   openChatWithUser,
// }: {
//   setModal: (arg: boolean) => void;
// //   users: User[];
//   openChatWithUser: (user: User) => void;
// }) => {
//   const currentUser = localStorage.getItem("user");
//   const users = useUsers()
//   return (
//     <>
//       {users.map((user) => {
//         console.log(user);
//         if (user.name != currentUser) {
//           return (
//             <div
//               className={cl.userNameInModal}
//               style={{ padding: "10px", cursor: "pointer" }}
//               key={user.socketID}
//               onClick={() => {
//                 openChatWithUser(user);
//                 setModal(false);
//               }}
//             >
//               {user.name}
//             </div>
//           );
//         }
//       })}
//     </>
//   );
// };
// export default ListUser;
