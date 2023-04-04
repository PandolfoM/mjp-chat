import Chats from "../components/Chats";

function Home() {
  return (
    <div className="home_page">
      <Chats /> {/* Sidebar with all current chats */}
      <div className="content">Hello World</div>
    </div>
  );
}

export default Home;
