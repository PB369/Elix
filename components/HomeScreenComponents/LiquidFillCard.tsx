import { BlurView } from "expo-blur";
import React, { FC, ReactNode, useEffect, useRef, useState } from "react";
import { Animated, Easing, StyleSheet, Text, View, ViewStyle } from "react-native";
import Svg, { Defs, LinearGradient, Path, Stop } from "react-native-svg";

interface LiquidFillCardProps {
  title?: string;
  icon?: ReactNode;
  status?: string;
  progress?: number;
  height?: number;
  style?: ViewStyle;
}

// ── helper da onda simplificado (alta performance) ──
function buildWavePath(W: number, H: number, fill: number, t: number): string {
  const SEG = 24;
  const surfaceY = H - (fill / 100) * H;
  const amp = 6; // Altura fixa da onda (não "pula" mais)

  // Início da linha no canto esquerdo
  let d = `M0,${surfaceY + amp * Math.sin(t)}`;

  for (let i = 0; i <= SEG; i++) {
    const x = (i / SEG) * W;
    // Math.PI * 4 cria o formato de duas ondas no card.
    // O '+ t' faz a onda rolar suavemente para a esquerda.
   const y = surfaceY + amp * Math.sin((i / SEG) * Math.PI * 2 + t);
    
    // toFixed(1) encurta a string enviada pela Bridge, otimizando ainda mais a performance
    d += `L${x.toFixed(1)},${y.toFixed(1)}`;
  }
  
  // Fecha o polígono até o fundo
  d += `L${W},${H}L0,${H}Z`;
  return d;
}

// ── componente interno: SVG atualizado via ref (não crasha o app) ──
const WaveSvg: FC<{ W: number; H: number; progressRef: React.MutableRefObject<number> }> = ({ W, H, progressRef }) => {
  const pathRef = useRef<any>(null);
  const fillRef = useRef(0);
  const tRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    function loop() {
      fillRef.current += (progressRef.current - fillRef.current) * 0.05;
      tRef.current += 0.025; // Bem mais lento e relaxante

      if (pathRef.current) {
        pathRef.current.setNativeProps({
          d: buildWavePath(W, H, fillRef.current, tRef.current),
        });
      }

      rafRef.current = requestAnimationFrame(loop);
    }

    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [W, H]);

  return (
    <Svg width={W} height={H} style={StyleSheet.absoluteFill}>
      <Defs>
        <LinearGradient id="lg" x1="0" y1="1" x2="0" y2="0">
          <Stop offset="0" stopColor="#c494ff" stopOpacity="1" />
          <Stop offset="0.5" stopColor="#8b5cf6" stopOpacity="1" />
          <Stop offset="1" stopColor="#5b21b6" stopOpacity="1" />
        </LinearGradient>
      </Defs>
      <Path ref={pathRef} fill="url(#lg)" />
    </Svg>
  );
};

// ── componente principal com UI completa ──
const LiquidFillCard: FC<LiquidFillCardProps> = ({
  title = "Neurologia",
  icon,
  status = "Consolidado",
  progress = 0,
  height = 220,
  style,
}) => {
  const [cardWidth, setCardWidth] = useState<number>(0);
  const progressRef = useRef<number>(progress);

  useEffect(() => {
    progressRef.current = Math.min(100, Math.max(0, progress));
  }, [progress]);

  const animPct = useRef(new Animated.Value(0)).current;
  const [displayPct, setDisplayPct] = useState(0);

  useEffect(() => {
    Animated.timing(animPct, {
      toValue: progress,
      duration: 1200,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [progress]);

  useEffect(() => {
    const id = animPct.addListener(({ value }) => {
      setDisplayPct(Math.round(value));
    });
    return () => animPct.removeListener(id);
  }, []);

  return (
    <View
      style={[styles.card, { height }, style]}
      onLayout={(e) => setCardWidth(Math.floor(e.nativeEvent.layout.width))}
    >
      {cardWidth > 0 && (
        <WaveSvg W={cardWidth} H={height} progressRef={progressRef} />
      )}

      {!!status && (
        <BlurView intensity={40} tint="dark" style={styles.tag}>
          <View style={styles.tagDot} />
          <Text style={styles.tagText}>{status}</Text>
        </BlurView>
      )}

      <View style={styles.center} pointerEvents="none">
        <BlurView intensity={30} tint="dark" style={styles.iconBox}>
          {typeof icon === "string" ? (
            <Text style={styles.iconEmoji}>{icon}</Text>
          ) : (
            icon ?? <Text style={styles.iconEmoji}>🧠</Text>
          )}
        </BlurView>
        <Text style={styles.title}>{title}</Text>
      </View>

      <View style={styles.pctBadge} pointerEvents="none">
        <Text style={styles.pctNumber}>{displayPct}</Text>
        <Text style={styles.pctSign}>%</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",
    borderRadius: 24,
    overflow: "hidden",
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.07)",
  },
  tag: {
    position: "absolute",
    top: 14,
    left: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingVertical: 5,
    paddingLeft: 7,
    paddingRight: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(196,148,255,0.28)",
    overflow: "hidden",
    zIndex: 10,
  },
  tagDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#c494ff",
    shadowColor: "#c494ff",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 4,
  },
  tagText: {
    fontSize: 11,
    fontWeight: "600",
    color: "rgba(220,190,255,0.95)",
    letterSpacing: 0.6,
    textTransform: "uppercase",
  },
  center: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    zIndex: 10,
  },
iconBox: {
    width: 64,
    height: 64,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    
    // Corpo do vidro
    backgroundColor: "rgba(255, 255, 255, 0.08)", 
    
    // Reflexo da luz nas bordas
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)", 
    
    // Necessário para o Blur não vazar
    overflow: "hidden", 
    
    // (Opcional) Sombra sutil para descolar o vidro do fundo
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
  },
  iconEmoji: {
    fontSize: 30,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
    letterSpacing: -0.3,
    textShadowColor: "rgba(0,0,0,0.6)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 8,
  },
  pctBadge: {
    position: "absolute",
    bottom: 14,
    right: 16,
    flexDirection: "row",
    alignItems: "flex-end",
    zIndex: 10,
  },
  pctNumber: {
    fontSize: 28,
    fontWeight: "800",
    color: "#fff",
    letterSpacing: -1,
    lineHeight: 30,
    textShadowColor: "rgba(0,0,0,0.5)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
  },
  pctSign: {
    fontSize: 16,
    fontWeight: "700",
    color: "rgba(255,255,255,0.7)",
    marginBottom: 1,
    textShadowColor: "rgba(0,0,0,0.5)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
  },
});

export default LiquidFillCard;