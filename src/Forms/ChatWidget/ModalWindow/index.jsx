// importing external style
import { styles } from "./../styles";
import { useState, useEffect, useContext } from "react";
import AuthContext from '../../../Context/AuthContext';
// eslint-disable-next-line 
import kitstyles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { format } from "date-fns";
import {
  MainContainer,
  Search,
  Conversation,
  ConversationList,
  Avatar,
  Sidebar,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  MessageSeparator,
  ConversationHeader,
  AvatarGroup,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";

import ChatService from "../../../Services/ChatService";

//for displaying the model view/Window
function ModalWindow(props) {
  // returning display

  const [socket, setSocket] = useState(null);
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const { user } = useContext(AuthContext);
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState({ name: "", messages: [], status: "away", lastActiveTime: null, lastActiveTimeString: '' });
  const [filterMessage, setFilterMessage] = useState("");

  useEffect(() => {
    // Get the username from local storage
    const storedUsername = !user() ? '' : user().fullname;
    if (storedUsername) {
      setUsername(storedUsername);
    } else {
      setUsername("");
    }

    // Connect to the WebSocket server with the username as a query parameter
    const newSocket = new WebSocket(`ws://localhost:8000/ws/chat/`);
    setSocket(newSocket);

    newSocket.onopen = () => {
      submitStatus(newSocket, 'available', storedUsername);
      requestStatuses(newSocket, storedUsername);
      console.log("WebSocket connected");
    };
    newSocket.onclose = () => {
      console.log("WebSocket disconnected");
    }

    // Clean up the WebSocket connection when the component unmounts
    return () => {
      if (newSocket.readyState === 1) {
        submitStatus(newSocket, "away", storedUsername);
      }
      newSocket.close();
    };

  }, [user]);

  useEffect(() => {
    const fetchData = async () => {
      const convResponse = await ChatService.getAllConversations(!user() ? '' : user().fullname);
      setConversations(convResponse);
    };

    fetchData();

  }, [user]);

  useEffect(() => {

    const setFilterConverstaions = async () => {
      saveCurrentMessages();
      setConverstionsInactive();
      setMessages([]);
      setActiveConversation({ name: "", messages: [], status: "away" });
      if (filterMessage === "") {
        conversations.forEach((m, i) => {
          m.hidden = false;
        });
      } else {
        conversations.forEach((m, i) => {
          m.type === "role" ? m.name.toUpperCase().indexOf(filterMessage.toUpperCase()) !== -1 ? m.hidden = false : m.hidden = true :
            m.name.toUpperCase().indexOf(filterMessage.toUpperCase()) !== -1 || m.item.role.name.toUpperCase().indexOf(filterMessage.toUpperCase()) !== -1 ? m.hidden = false : m.hidden = true;
        });
      }
      setConversations(conversations => [...conversations]);
    };

    setFilterConverstaions();

  }, [filterMessage]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {

    const sendTypeIndicator = async () => {
      if (socket && username && activeConversation.name !== "" && activeConversation.type === "user") {
        const data = {
          message: message.trim() ? 'typing' : '',
          username: 'typeIndicator',
          sender: username,
          roomname: activeConversation.item.fullname
        };
        socket.send(JSON.stringify(data));
      }
    };

    sendTypeIndicator();

  }, [message]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    let isAnythingUnread = false;
    conversations.forEach((m, i) => {
      if (m.unreadDot === true) {
        isAnythingUnread = true;
      }
    });
    props.setHasUnreadMessage(isAnythingUnread);

  }, [conversations]); // eslint-disable-line react-hooks/exhaustive-deps

  if (socket) {
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const roomname = data.roomname;
      if (roomname === data.sender) {
        if (data.username === 'announceStatus') {
          conversations.forEach((m, i) => {
            if (m.type === "user" && m.item.fullname === roomname) {
              m.status = data.message;
              m.lastActiveTime = new Date();
            }
          });
        } else if (data.username === 'requestStatuses') {
          submitStatus(socket, 'available', user().fullname);
        }
      } else {
        if (user().fullname === data.sender && data.username !== 'typeIndicator') { // sent by me
          conversations.forEach((m, i) => {
            const itemName = m.type === "role" ? m.item.name : m.item.fullname;
            if (itemName === roomname) {
              m.messages.push(data);
            }
          });
        } else if (user().fullname === roomname) { // sent to me
          if (data.username === 'typeIndicator') {
            conversations.forEach((m, i) => {
              if (m.type === "user" && m.item.fullname === data.sender) {
                m.typeIndicator = data.message;
                m.lastActiveTime = new Date();
              }
            });
          } else {
            conversations.forEach((m, i) => {
              if (m.type === "user" && m.item.fullname === data.sender) {
                data.isUnread = true;
                m.messages.push(data);
                m.unreadDot = true;
                m.lastActiveTime = new Date();
              }
            });
          }
        } else { // sent by someone else to group 
          conversations.forEach((m, i) => {
            if (m.type === "role" && m.item.name === roomname) {
              m.members.forEach((c, j) => {
                if (c.fullname === user().fullname) {
                  data.isUnread = true;
                  m.messages.push(data);
                  m.unreadDot = !m.active;
                  m.lastActiveTime = new Date();
                }
              });
            }
          });
        }
      }
      setConversations(() => [...conversations]);
    }
  };

  const submitStatus = (mySocket, myStatus, storedUsername) => {
    if (mySocket) {
      const data = {
        message: myStatus,
        username: 'announceStatus',
        sender: storedUsername,
        roomname: storedUsername
      };
      mySocket.send(JSON.stringify(data));
    }
  };

  const requestStatuses = (mySocket, storedUsername) => {
    if (mySocket) {
      const data = {
        message: '',
        username: 'requestStatuses',
        sender: storedUsername,
        roomname: storedUsername
      };
      mySocket.send(JSON.stringify(data));
    }
  };

  const handleSubmit = () => {
    if (message && socket) {
      if (activeConversation.type === "role") {
        let isInConv = false;
        activeConversation.members.forEach((c, j) => {
          if (c.fullname === username) {
            isInConv = true;
            const data = {
              message: message,
              username: "",
              sender: username,
              roomname: activeConversation.item.name
            };
            socket.send(JSON.stringify(data));
          }
        });
        if (!isInConv) {
          activeConversation.members.forEach((c, j) => {
            const data = {
              message: message,
              username: activeConversation.name,
              sender: username,
              roomname: c.fullname
            };
            socket.send(JSON.stringify(data));
          });

        }
      } else {

        const data = {
          message: message,
          username: "",
          sender: username,
          roomname: activeConversation.item.fullname
        };
        socket.send(JSON.stringify(data));
      }
      setMessage("");
    }
  };

  const setConverstionsInactive = () => {
    conversations.forEach((m, i) => {
      m.active = false;
    });
  };

  const saveCurrentMessages = () => {
    conversations.forEach((m, i) => {
      if (m.active) {
        messages.forEach((u, i) => {
          u.isUnread = false;
        });
        m.messages = messages;
      }
    });
  };

  const setCurrentConversation = (userIndex) => {
    saveCurrentMessages();
    setConverstionsInactive();
    conversations[userIndex].active = true;
    conversations[userIndex].unreadDot = false;
    setMessages(conversations[userIndex].messages);
    setConversations(() => [...conversations]);
    calcLastActiveTime(conversations[userIndex]);
    setActiveConversation(conversations[userIndex]);
  };


  const calcLastActiveTime = (conv) => {
    if(conv && conv.lastActiveTime) {
      const distance = (new Date()).getTime() - conv.lastActiveTime.getTime();
      let lastActiveTimeString = '';
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      if(minutes === 0 && days === 0 && hours === 0) {
        lastActiveTimeString = 'less than a minute';
      } else if (minutes === 1 && days === 0 && hours === 0) {
        lastActiveTimeString = 'a minute';
      } else if (minutes > 1 && days === 0 && hours === 0) {
          lastActiveTimeString = minutes + ' minutes';
      } else if (hours === 1 && days === 0) {
          lastActiveTimeString = 'less than two hours';
      } else if (hours > 1 && days === 0) {
          lastActiveTimeString = hours + ' hours';   
      } else if (days === 1) {
          lastActiveTimeString = 'less than two days';                 
      } else {
          lastActiveTimeString = days + 'days';
      }
      conv.lastActiveTimeString = lastActiveTimeString;
    }
  }

  return (
    <div
      style={{
        ...styles.modalWindow,
        ...{
          opacity: props.visible ? "1" : "0",
        }
      }}
    >
      <div style={{ position: "relative", height: "600px" }}>
        <MainContainer responsive
          style={{
            height: '600px'
          }}
        >
          <Sidebar
            position="left"
          >
            <Search placeholder="Search..."
              value={filterMessage}
              onChange={(v) => setFilterMessage(v)}
              onClearClick={() => setFilterMessage("")} />
            <ConversationList>
              {conversations.map((u, i) =>
                <Conversation
                  unreadDot={u.unreadDot}
                  hidden={u.hidden}
                  active={u.active}
                  key={i}
                  info={u.type === 'user' ? <span>{u.typeIndicator === "typing" ? <TypingIndicator /> : null}{u.item.role.name}</span> : null}
                  name={u.name}
                  onClick={() => setCurrentConversation(i)}
                >
                  {u.type === 'role' ? <AvatarGroup max={4} size="sm">
                    {u.members.map((m, i) =>
                      <Avatar
                        key={i}
                        name={m.fullname}
                        src="https://chatscope.io/storybook/react/assets/lilly-aj6lnGPk.svg"
                        size="lg"
                      />)}
                  </AvatarGroup> :
                    <Avatar
                      key={i}
                      name={u.name}
                      src="https://chatscope.io/storybook/react/assets/lilly-aj6lnGPk.svg"
                      status={u.status}
                    />}
                </Conversation>
              )}
            </ConversationList>
          </Sidebar>
          <ChatContainer>
            {activeConversation.name !== "" ?
              <ConversationHeader>
                <ConversationHeader.Back />
                {activeConversation.type === "user" ? <Avatar
                  name={activeConversation.name}
                  src="https://chatscope.io/storybook/react/assets/lilly-aj6lnGPk.svg"
                  status={activeConversation.status}
                />
                  :
                  <AvatarGroup max={5} size="sm" style={{
                    ...styles.agLine
                  }}   >
                    {activeConversation.members.map((m, i) =>
                      <Avatar
                        name={m.fullname}
                        src="https://chatscope.io/storybook/react/assets/lilly-aj6lnGPk.svg"
                        size="lg"
                        key={i}
                      />)}
                  </AvatarGroup>}
                <ConversationHeader.Content
                  info={activeConversation.lastActiveTimeString ? "Active " + activeConversation.lastActiveTimeString + " ago" : null}
                  userName={activeConversation.name}
                />
              </ConversationHeader> : null
            }
            <MessageList
              typingIndicator={activeConversation.name !== "" && activeConversation.typeIndicator === "typing" ? <TypingIndicator content={activeConversation.name + " is typing"} /> : null}
            >
              {messages.map((m, i) => m.type === "separator" ?
                <MessageSeparator key={i} {...m.props} /> :
                <Message key={i} model={{ message: m.message, sentTime: m.timestamp, sender: m.sender, direction: username === m.sender ? "outgoing" : "incoming", position: "normal" }} >
                  <Message.Header>{username !== m.sender && activeConversation.type === "role" ? <b>{m.sender}&nbsp;&nbsp;&nbsp;</b> : ""}<span style={{ ...styles.alignRight }}>{format(m.timestamp, "MMMM do, yyyy H:mma")}</span></Message.Header>
                  {m.username !== "" ? <Message.Footer>Forwarded from {m.username} chat</Message.Footer> : null}
                  {m.isUnread ? <Message.HtmlContent html={"<strong>" + m.message + "</strong>"} /> : null}
                </Message>
              )}
            </MessageList>
            {activeConversation.name !== "" ?
              <MessageInput placeholder="Type message here"
                onChange={(textContent) =>
                  setMessage(textContent)
                }
                onSend={handleSubmit}
                attachButton={false}
              />
              : null}
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  );
}
export default ModalWindow;