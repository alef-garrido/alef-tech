"use client";

import React from 'react';

export function CapsuleCard({
  title,
  id,
  dotColor,
  children,
  footer,
  className = '',
}: {
  title: string;
  id?: string;
  dotColor?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`capsule-card ${className}`}>
      <div className="cap-head">
        <span
          className="dot"
          style={dotColor ? { background: dotColor, boxShadow: `0 0 0 4px ${dotColor}33` } : undefined}
        />
        <h4>{title}</h4>
        {id && <span className="id">{id}</span>}
      </div>
      <div className="cap-body">{children}</div>
      {footer && <div className="cap-foot">{footer}</div>}
    </div>
  );
}

export function TerminalBox({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`terminal ${className}`}>{children}</div>;
}

export function ReadoutBox({
  val,
  delta,
  label,
  className = '',
}: {
  val: string;
  delta?: string;
  label?: string;
  className?: string;
}) {
  return (
    <div className={`readout ${className}`}>
      {label && <span className="label">{label}</span>}
      <span className="val">{val}</span>
      {delta && <span className="delta">{delta}</span>}
    </div>
  );
}

export function Badge({
  variant = 'on',
  children,
  className = '',
}: {
  variant?: 'on' | 'warn' | 'idle';
  children: React.ReactNode;
  className?: string;
}) {
  const variantClass = variant === 'on' ? 'b-on' : variant === 'warn' ? 'b-warn' : 'b-idle';
  return <span className={`badge ${variantClass} ${className}`}>{children}</span>;
}

export function Chip({
  variant = 'default',
  children,
  className = '',
}: {
  variant?: 'on' | 'warn' | 'default';
  children: React.ReactNode;
  className?: string;
}) {
  const variantClass = variant === 'on' ? 'on' : variant === 'warn' ? 'warn' : '';
  return <span className={`chip ${variantClass} ${className}`}>{children}</span>;
}

export function Eyebrow({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <p className={`eyebrow ${className}`}>{children}</p>;
}
