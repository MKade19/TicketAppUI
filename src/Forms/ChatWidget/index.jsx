import { useState, useRef, useEffect} from "react";
// import external styling
import { styles } from "./styles";
// import icon
import { BsFillChatFill } from "react-icons/bs";
//import ModalWindow
import ModalWindow from "./ModalWindow";

function ChatWidget() {

    const [hasUnreadMessage, setHasUnreadMessage] = useState(false);
    // state variable to track if widget button was hovered on
    const [hovered, setHovered] = useState(false);
        // state variable to track modal visibility
        const [visible, setVisible] = useState(false);

    //creating a ref 'id'
    const widgetRef = useRef(null);
    // use effect listener to check if the mouse was cliked outside the window 
    useEffect(() => {
      function handleClickOutside(event) {
        if (widgetRef.current && !widgetRef.current.contains(event.target)) {
          setVisible(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [widgetRef]);

    return (
    //Container
    <div ref={widgetRef}>
        {/* Call Modal Window */}
        <ModalWindow visible={visible} setHasUnreadMessage={setHasUnreadMessage}/>
        {/* Chat Button Component */}
        <div
            onClick={() => setVisible(!visible)}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          style={{
            ...styles.chatWidget,
            ...{ 
              border: hovered ? "1px solid black" : "",
              zIndex: 100
            },
          }}
        >
          {/* Inner Container */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
            >
            {/* Button Icon */}
            <BsFillChatFill size={20} color="white" />

            {/* Button Text */}
            <span style={styles.chatWidgetText}>Chat Now!!</span>            
          </div>         
          {hasUnreadMessage ? <div className="cs-status cs-status--md cs-status--dnd" style={{...styles.chatMessageBullet}}><div className="cs-status__bullet"></div></div> : null}
        </div>
      </div>
    );
   }
   
   
   export default ChatWidget;