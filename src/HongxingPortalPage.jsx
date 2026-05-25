import React from "react";
import "./hongxing-portal.css";

const bgImage = "/assets/portal-bg_green.png";

export default function HongxingPortalPage({ onAction }) {
  return (
    <div
      className="hx-portal-bg"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      {/* 我的洪小星 — 透明点击区 */}
      <button
        type="button"
        className="hx-portal-entry"
        onClick={() => onAction && onAction("my-hongxiaoxing")}
      >
        我的洪小星
      </button>

      {/* 右上角管理员登录 */}
      <div className="hx-portal-admin-right">
        <span
          className="hx-portal-admin-link"
          onClick={() => onAction && onAction("admin-login")}
          title="进入管理后台"
        >
          管理员登录
        </span>
      </div>
    </div>
  );
}
