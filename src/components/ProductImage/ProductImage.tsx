"use client";

import { useState } from "react";
import {
  Laptop,
  Smartphone,
  Headphones,
  Tablet,
  Monitor,
  Keyboard,
  Mouse,
  Watch,
  Battery,
  Camera,
  Cpu,
  HardDrive,
  Wifi,
  Tv,
  Package,
} from "lucide-react";

interface ProductImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  category?: string;
  className?: string;
}

export function ProductImage({
  src,
  alt,
  category,
  className,
  ...props
}: ProductImageProps) {
  const [imageError, setImageError] = useState(false);

  if (imageError || !src) {
    // Escolhe um ícone apropriado baseado na categoria
    const iconClass = "w-12 h-12 text-secondary/80 mb-2";
    const cat = category?.toLowerCase() || "";

    let Icon = Package;
    if (cat.includes("notebook") || cat.includes("laptop")) Icon = Laptop;
    else if (
      cat.includes("celular") ||
      cat.includes("smart") ||
      cat.includes("phone")
    )
      Icon = Smartphone;
    else if (
      cat.includes("áudio") ||
      cat.includes("fone") ||
      cat.includes("audio") ||
      cat.includes("speaker")
    )
      Icon = Headphones;
    else if (cat.includes("tablet") || cat.includes("pad")) Icon = Tablet;
    else if (
      cat.includes("periférico") ||
      cat.includes("monitor") ||
      cat.includes("tela")
    )
      Icon = Monitor;
    else if (cat.includes("teclado") || cat.includes("keyboard")) Icon = Keyboard;
    else if (cat.includes("mouse")) Icon = Mouse;
    else if (
      cat.includes("vestíve") ||
      cat.includes("smartwatch") ||
      cat.includes("relógio")
    )
      Icon = Watch;
    else if (cat.includes("bateria") || cat.includes("power")) Icon = Battery;
    else if (
      cat.includes("foto") ||
      cat.includes("câmera") ||
      cat.includes("camera")
    )
      Icon = Camera;
    else if (
      cat.includes("componente") ||
      cat.includes("gpu") ||
      cat.includes("placa")
    )
      Icon = Cpu;
    else if (
      cat.includes("ssd") ||
      cat.includes("hd") ||
      cat.includes("memória")
    )
      Icon = HardDrive;
    else if (
      cat.includes("rede") ||
      cat.includes("roteador") ||
      cat.includes("router")
    )
      Icon = Wifi;
    else if (cat.includes("stream")) Icon = Tv;

    return (
      <div
        className={`flex flex-col items-center justify-center bg-slate-950/40 border border-white/5 rounded-2xl w-full h-full text-center p-4 ${className}`}
      >
        <Icon className={iconClass} />
        <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider max-w-[90%] truncate">
          {alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setImageError(true)}
      className={className}
      {...props}
    />
  );
}
