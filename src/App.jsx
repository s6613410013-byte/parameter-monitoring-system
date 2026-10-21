import { useState } from "react";
import {
  BatteryCharging,
  Expand,
  LockKeyhole,
  Send,
  UserRound,
  Zap,
} from "lucide-react";

const NAV_ITEMS = [
  { id: "overview", label: "ภาพรวม" },
  { id: "energy", label: "กราฟ" },
  { id: "camera", label: "กล้องและระบบถามตอบ" },
];

const METRICS = [
  { label: "แรงดัน", value: "12.4 V", note: "ตัวอย่าง" },
  { label: "อัปเดตล่าสุด", value: "09:41 น.", note: "ตัวอย่าง" },
  { label: "กำลังใช้งาน", value: "—" },
  { label: "กระแส", value: "—" },
  { label: "กำลังไฟฟ้า", value: "—" },
  { label: "พลังงานสะสม", value: "—" },
];

const CHAT_ANSWERS = {
  "วันนี้ใช้งานไปกี่ชั่วโมง?":
    "ระบบใช้งานไปแล้วประมาณ 4.2 ชั่วโมง (ตัวอย่าง)",
  "แบตเตอรี่ปัจจุบันเหลือกี่ %?":
    "ข้อมูลเปอร์เซ็นต์แบตเตอรี่ไม่พร้อมใช้งานในตัวอย่างนี้",
  "ระบบมีข้อผิดพลาดอะไรไหม?": "ไม่พบข้อผิดพลาดในระบบ (ตัวอย่าง)",
};

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function submit(event) {
    event.preventDefault();
    onLogin();
  }

  return (
    <main className="login-screen">
      <h1 className="login-title">
        Parameter Monitoring
        <span>System</span>
      </h1>

      <form className="login-card" onSubmit={submit}>
        <h2>Login</h2>

        <label htmlFor="username">Username</label>
        <div className="input-wrap">
          <UserRound size={21} fill="currentColor" />
          <input
            id="username"
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Username"
            value={username}
          />
        </div>

        <label htmlFor="password">Password</label>
        <div className="input-wrap">
          <LockKeyhole size={21} fill="currentColor" />
          <input
            id="password"
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
            type="password"
            value={password}
          />
        </div>

        <button className="login-button" type="submit">
          Login
        </button>
      </form>
    </main>
  );
}

function DashboardHeader({ activePage, onNavigate, onLogout }) {
  return (
    <>
      <nav className="top-nav" aria-label="เมนูหลัก">
        {NAV_ITEMS.map((item) => (
          <button
            className={activePage === item.id ? "active" : ""}
            key={item.id}
            onClick={() => onNavigate(item.id)}
          >
            {item.label}
          </button>
        ))}

        <button onClick={onLogout}>ออกจากระบบ</button>
      </nav>

      <h1 className="dashboard-title">
        ระบบตรวจวัดค่าพารามิเตอร์ภายในเรือ
      </h1>
    </>
  );
}

function BatteryPanel({ type }) {
  const engine = type === "engine";

  const title = engine
    ? "แบตเตอรี่ระบบเครื่องยนต์"
    : "แบตเตอรี่ระบบไฟภายในเรือ";

  const subtitle = engine
    ? "แบตเตอรี่สำหรับสตาร์ทเครื่องยนต์และระบบจ่ายไฟเริ่มเครื่อง"
    : "แบตเตอรี่สำหรับระบบไฟแสงสว่างและอุปกรณ์ภายในเรือ";

  const voltage = engine ? "12V" : "24V";

  return (
    <section className="battery-section">
      <header className="battery-heading">
        <BatteryCharging size={26} />

        <div>
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>

        <strong>{voltage}</strong>
      </header>

      <div className="metric-shell">
        <div className="metric-grid">
          {METRICS.map((metric, index) => (
            <article className="metric-card" key={metric.label}>
              <p>{metric.label}</p>

              <strong>
                {index === 0 && !engine ? "24 V" : metric.value}
              </strong>

              <small>
                {metric.note ||
                  `รอข้อมูล${
                    engine
                      ? "แบตเตอรี่ระบบเครื่องยนต์"
                      : "แบตเตอรี่ระบบไฟภายในเรือ"
                  }`}
              </small>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Overview() {
  return (
    <div className="two-column overview-grid">
      <BatteryPanel type="engine" />
      <BatteryPanel type="interior" />
    </div>
  );
}

function Chart({ title, badge }) {
  return (
    <section className="chart-card">
      <header className="panel-heading">
        <span className="panel-icon">
          <BatteryCharging />
        </span>

        <div>
          <h2>{title}</h2>
          <p>แบตเตอรี่ 12V และ 24V เมื่อเวลาผ่านไป</p>
        </div>

        <strong className="round-badge">{badge}</strong>
      </header>

      <div className="chart-content">
        <div className="chart-caption">
          <strong>
            {badge === "I" ? "กระแสไฟฟ้า" : "แรงดันไฟฟ้า"} (V)
            เมื่อเวลาผ่านไป
          </strong>
          <span>ตัวอย่างข้อมูล</span>
        </div>

        <div className="chart-plot">
          <span className="y y1">28</span>
          <span className="y y2">23</span>
          <span className="y y3">18</span>
          <span className="y y4">13</span>
          <span className="y y5">8</span>

          <svg
            viewBox="0 0 600 190"
            preserveAspectRatio="none"
            aria-label="กราฟข้อมูลแบตเตอรี่"
          >
            <line x1="0" y1="35" x2="600" y2="35" />
            <line x1="0" y1="75" x2="600" y2="75" />
            <line x1="0" y1="115" x2="600" y2="115" />
            <line x1="0" y1="155" x2="600" y2="155" />

            <polyline
              className="line-24"
              points="48,63 160,65 280,68 400,66 510,65 588,67"
            />

            <polyline
              className="line-12"
              points="48,139 160,140 280,142 400,141 510,140 588,141"
            />

            <circle className="dot-24" cx="588" cy="67" r="4" />
            <circle className="dot-12" cx="588" cy="141" r="4" />
          </svg>
        </div>

        <div className="x-axis">
          {["08:00", "08:20", "08:40", "09:00", "09:20", "09:41"].map(
            (time) => (
              <span key={time}>{time}</span>
            ),
          )}
        </div>

        <div className="legend">
          <span>
            <i className="key key-12" />
            แบตเตอรี่ 12V
          </span>

          <span>
            <i className="key key-24" />
            แบตเตอรี่ 24V
          </span>
        </div>
      </div>
    </section>
  );
}

function Energy() {
  return (
    <div className="two-column">
      <Chart badge="I" title="กราฟกระแสไฟฟ้า" />
      <Chart badge="V" title="กราฟแรงดันไฟฟ้า" />
    </div>
  );
}

function CameraPanel({ onNotice }) {
  function expandCamera() {
    const element = document.querySelector(".camera-view");
    element?.requestFullscreen?.();
  }

  return (
    <section className="camera-card">
      <header className="panel-heading">
        <span className="panel-icon">
          <Zap />
        </span>

        <div>
          <h2>กล้องในเรือ</h2>
          <p>กล้องในเรือ • ยังไม่ได้เปิดใช้งาน</p>
        </div>

        <strong className="status-pill">ยังไม่เปิด</strong>
      </header>

      <h3>ภาพจากกล้อง</h3>

      <div className="camera-content">
        <div className="camera-meta">
          <strong>กล้องหน้าเรือ • ยังไม่เปิดใช้งาน</strong>
          <span>ยังไม่มีการสตรีม</span>
        </div>

        <div className="camera-view">
          <span>ยังไม่เปิดใช้งาน</span>

          <p>
            พื้นที่แสดงภาพจากกล้อง
            <small>
              ในระบบจริงตรงนี้คือภาพสดจาก Pi Camera 3 ที่ส่งมาแบบ MJPEG
              <br />
              หน้าจอนี้เป็นต้นแบบ จึงยังไม่มีภาพจริง
            </small>
          </p>
        </div>

        <div className="camera-actions">
          <button onClick={() => onNotice("บันทึกภาพนิ่งตัวอย่างแล้ว")}>
            ภาพนิ่ง
          </button>

          <button onClick={expandCamera}>
            <Expand size={18} />
            เปิดเต็มจอ
          </button>
        </div>
      </div>
    </section>
  );
}

function ChatPanel() {
  const [messages, setMessages] = useState([
    {
      from: "user",
      text: "วันนี้ใช้งานไปกี่ชั่วโมง?",
    },
    {
      from: "system",
      text: CHAT_ANSWERS["วันนี้ใช้งานไปกี่ชั่วโมง?"],
    },
    {
      from: "user",
      text: "แบตเตอรี่ปัจจุบันเหลือกี่ %?",
    },
    {
      from: "system",
      text: CHAT_ANSWERS["แบตเตอรี่ปัจจุบันเหลือกี่ %?"],
    },
    {
      from: "user",
      text: "ระบบมีข้อผิดพลาดอะไรไหม?",
    },
    {
      from: "system",
      text: CHAT_ANSWERS["ระบบมีข้อผิดพลาดอะไรไหม?"],
    },
  ]);

  const [input, setInput] = useState("");

  function ask(question) {
    const cleanQuestion = question.trim();

    if (!cleanQuestion) {
      return;
    }

    setMessages((current) => [
      ...current,
      {
        from: "user",
        text: cleanQuestion,
      },
      {
        from: "system",
        text:
          CHAT_ANSWERS[cleanQuestion] ||
          "ระบบได้รับคำถามแล้ว (ตัวอย่าง)",
      },
    ]);

    setInput("");
  }

  return (
    <section className="chat-card">
      <header className="panel-heading">
        <span className="panel-icon">
          <BatteryCharging />
        </span>

        <div>
          <h2>ถามระบบ</h2>
          <p>สอบถามข้อมูลระบบและสถานะเรือ</p>
        </div>

        <strong className="status-pill">ระบบ</strong>
      </header>

      <div className="chat-content">
        <div className="chat-label">
          <strong>ประวัติการสนทนา</strong>
          <span>ตัวอย่างข้อมูล</span>
        </div>

        <div className="messages">
          {messages.map((message, index) => (
            <div
              className={`message-row ${message.from}`}
              key={`message.text-{index}`}
            >
              <span className="sender">
                {message.from === "user" ? "ผู้ใช้" : "ระบบ"}
              </span>

              <p>{message.text}</p>
            </div>
          ))}
        </div>

        <div className="quick-questions">
          {Object.keys(CHAT_ANSWERS).map((question) => (
            <button key={question} onClick={() => ask(question)}>
              {question}
            </button>
          ))}
        </div>

        <form
          className="chat-form"
          onSubmit={(event) => {
            event.preventDefault();
            ask(input);
          }}
        >
          <input
            onChange={(event) => setInput(event.target.value)}
            placeholder="พิมพ์คำถาม..."
            value={input}
          />

          <button aria-label="ส่งคำถาม" type="submit">
            <Send size={18} />
            <span>ส่ง</span>
          </button>
        </form>
      </div>
    </section>
  );
}

function CameraAndChat({ onNotice }) {
  return (
    <>
      <div className="connection-bar">
        <strong>สถานะการเชื่อมต่อ</strong>

        <span>
          การเชื่อมต่อจำลอง • 12.4 เมกะบิตต่อวินาที • อัปเดต 09:41 น.
        </span>

        <b>ตัวอย่าง / เชื่อมต่อแล้ว</b>
      </div>

      <div className="two-column">
        <CameraPanel onNotice={onNotice} />
        <ChatPanel />
      </div>
    </>
  );
}

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [activePage, setActivePage] = useState("overview");
  const [notice, setNotice] = useState("");

  function showNotice(message) {
    setNotice(message);

    window.setTimeout(() => {
      setNotice("");
    }, 2200);
  }

  if (!loggedIn) {
    return <Login onLogin={() => setLoggedIn(true)} />;
  }

  return (
    <main className="dashboard">
      <DashboardHeader
        activePage={activePage}
        onLogout={() => {
          setLoggedIn(false);
          setActivePage("overview");
        }}
        onNavigate={setActivePage}
      />

      {activePage === "overview" && <Overview />}
      {activePage === "energy" && <Energy />}

      {activePage === "camera" && (
        <CameraAndChat onNotice={showNotice} />
      )}

      {notice && (
        <div className="toast" role="status">
          {notice}
        </div>
      )}
    </main>
  );
}
