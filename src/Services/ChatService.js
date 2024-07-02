import UserService from "../Services/UserService";
import RoleService from "../Services/RoleService";

class ChatService {

    getSocket = async () => {  
      return new WebSocket(`ws://localhost:8000/ws/chat/`);
    }

    getAllConversations = async (currentUserName) => {
        let conversations = [];
        const roleResponse = await RoleService.getAll();
        const userResponse = await UserService.getAll();

        roleResponse.data.forEach((m, i) => {
            let conversation = {
              name: m.name + " Group's Chat",
              active: false,
              type: "role",
              item: m, 
              messages: [],
              members: [],
              status: "away",
              hidden: false,
              typeIndicator: "",
              unreadDot: false,
              lastActiveTime: null,
              lastActiveTimeString: ''
            };
            conversations.push(conversation);
          }); 

        userResponse.data.forEach((m, i) => {
          if(m.fullname !== currentUserName) {
            let conversation = {
              name: m.fullname,
              active: false,
              type: "user",
              item: m, 
              messages: [],
              members: [m],
              status: "away",
              hidden: false,
              typeIndicator: "",
              unreadDot: false,
              lastActiveTime: null,
              lastActiveTimeString: ''
            };
            conversations.push(conversation);
          }
          conversations.forEach((c, j) => {
            if(c.type === "role" && m.role.name === c.item.name){
              c.members.push(m);
            }
          }); 
        }); 

        return conversations;
    }



}

const chatService = new ChatService();
export default chatService;