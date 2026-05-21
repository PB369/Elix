import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const C = {
  surface:                '#16111b',
  surfaceContainerHigh:   '#2e2832',
  primaryContainer:       '#8a2be2',
  onPrimaryContainer:     '#eed9ff',
  onSurface:              '#eadfee',
  onSurfaceVariant:       '#cfc2d7',
  outlineVariant:         '#4c4354',
  secondaryContainer:     '#5d3587',
  onSecondaryContainer:   '#d2a6ff',
  correct:                '#00c896',
};

const QUESTIONS = [
  {
    category: 'Neurociência Aplicada',
    title: 'Qual região do cérebro é a principal responsável pela consolidação da memória?',
    hint: 'Considere o processo de transferência da memória de curto prazo para os sistemas de armazenamento de longo prazo.',
    options: [
      { id: 'a', label: 'Córtex Pré-frontal' },
      { id: 'b', label: 'Hipocampo' },
      { id: 'c', label: 'Cerebelo' },
      { id: 'd', label: 'Amígdala' },
    ],
    correctId: 'b',
  },
  {
    category: 'Neurociência Aplicada',
    title: 'Qual neurotransmissor está centralmente envolvido no sistema de recompensa e na motivação?',
    hint: 'Sua liberação gera a sensação de antecipação de um benefício ou prazer.',
    options: [
      { id: 'a', label: 'Serotonina' },
      { id: 'b', label: 'GABA' },
      { id: 'c', label: 'Dopamina' },
      { id: 'd', label: 'Acetilcolina' },
    ],
    correctId: 'c',
  },
  {
    category: 'Neurociência Aplicada',
    title: 'A capacidade do cérebro de se reorganizar e formar novas conexões ao longo da vida é chamada de:',
    hint: 'Pense na maleabilidade do tecido nervoso frente a novos aprendizados ou lesões.',
    options: [
      { id: 'a', label: 'Neuroplasticidade' },
      { id: 'b', label: 'Mielinização' },
      { id: 'c', label: 'Homeostase sináptica' },
      { id: 'd', label: 'Potenciação de Curto Prazo' },
    ],
    correctId: 'a',
  },
];

export default function QuizScreen() {
  const { width } = useWindowDimensions();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const question = QUESTIONS[currentIndex];
  const progress = (currentIndex + 1) / QUESTIONS.length;
  const isLast = currentIndex === QUESTIONS.length - 1;

  function handleSelect(id: string) {
    if (confirmed) return;
    setSelected(id);
  }

  function handleNextStep() {
    if (!confirmed) {
      setConfirmed(true);
    } else if (!isLast) {
      setCurrentIndex(i => i + 1);
      setSelected(null);
      setConfirmed(false);
    } else {
      router.back();
    }
  }

  function getOptionBorder(id: string) {
    if (!confirmed) {
      return selected === id
        ? { borderWidth: 1.5, borderColor: C.primaryContainer }
        : {};
    }
    if (id === question.correctId) return { borderWidth: 1.5, borderColor: C.correct };
    if (id === selected) return { borderWidth: 1.5, borderColor: '#ff6b6b' };
    return {};
  }

  function getOptionTextColor(id: string): string {
    if (!confirmed) return C.onSurface;
    if (id === question.correctId) return C.correct;
    if (id === selected) return '#ff6b6b';
    return C.onSurface;
  }

  const buttonLabel = !selected
    ? 'Selecione uma opção'
    : !confirmed
    ? 'Confirmar'
    : isLast
    ? 'Finalizar Simulado'
    : 'Próxima pergunta →';

  const progressWidth = (width - 48 - 40 - 12) * progress; // desconta botão X + gap

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: C.surface }} edges={['top', 'bottom']}>

      {/* ── Header: botão X + progress bar ── */}
      <View className="flex-row items-center px-6 pt-4 pb-3 gap-3">

        {/* Botão X */}
        <TouchableOpacity
          onPress={() => router.back()}
          activeOpacity={0.7}
          className="items-center justify-center"
          style={{
            width: 36,
            height: 36,
            borderRadius: 18,
            backgroundColor: C.surfaceContainerHigh,
            flexShrink: 0,
          }}
        >
          <Feather name="x" size={16} color={C.onSurfaceVariant} />
        </TouchableOpacity>

        {/* Progress track */}
        <View
          className="flex-1 rounded-full overflow-hidden"
          style={{ height: 10, backgroundColor: C.surfaceContainerHigh }}
        >
          <View
            className="h-full rounded-full"
            style={{
              width: progressWidth,
              backgroundColor: C.primaryContainer,
            }}
          />
        </View>

        {/* Contador */}
        <Text
          style={{
            fontFamily: 'Manrope_600SemiBold',
            fontSize: 12,
            color: C.onSurfaceVariant,
            flexShrink: 0,
          }}
        >
          {currentIndex + 1}/{QUESTIONS.length}
        </Text>
      </View>

      {/* ── Scroll ── */}
      <View className="flex-1">
        <ScrollView
          contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 20, paddingBottom: 16 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Category chip */}
          <View
            className="self-start rounded-full px-3 py-1 mb-5"
            style={{ backgroundColor: C.secondaryContainer }}
          >
            <Text style={{
              fontFamily: 'Manrope_600SemiBold',
              fontSize: 10,
              letterSpacing: 0.8,
              color: C.onSecondaryContainer,
            }}>
              {question.category.toUpperCase()}
            </Text>
          </View>

          {/* Question */}
          <Text style={{
            fontWeight:600,
            fontSize: 30,
            lineHeight: 32,
            color: C.onSurface,
            marginBottom: 16,
            letterSpacing: -0.4,
          }}>
            {question.title}
          </Text>

          {/* Hint */}
          <Text style={{
            fontFamily: 'Manrope_400Regular',
            fontSize: 14,
            lineHeight: 22,
            color: C.onSurfaceVariant,
            marginBottom: 28,
          }}>
            {question.hint}
          </Text>

          {/* Options */}
          <View style={{ gap: 10 }}>
            {question.options.map((opt) => (
              <TouchableOpacity
                key={opt.id}
                onPress={() => handleSelect(opt.id)}
                activeOpacity={0.75}
                className="flex-row items-center justify-between px-5 rounded-2xl"
                style={[
                  { paddingVertical: 18, backgroundColor: C.surfaceContainerHigh },
                  getOptionBorder(opt.id),
                ]}
              >
                <Text
                  className="flex-1"
                  style={{
                    fontFamily: confirmed && opt.id === question.correctId
                      ? 'Manrope_700Bold'
                      : 'Manrope_500Medium',
                    fontSize: 15,
                    color: getOptionTextColor(opt.id),
                  }}
                >
                  {opt.label}
                </Text>

                {/* Radio / result icon */}
                {!confirmed && (
                  <View className="items-center justify-center"
                    style={{ width: 22, height: 22, borderRadius: 11, borderWidth: 1.5, borderColor: C.outlineVariant, flexShrink: 0 }}
                  >
                    {selected === opt.id && (
                      <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: C.primaryContainer }} />
                    )}
                  </View>
                )}
                {confirmed && opt.id === question.correctId && (
                  <View className="items-center justify-center"
                    style={{ width: 22, height: 22, borderRadius: 11, backgroundColor: C.correct, flexShrink: 0 }}
                  >
                    <Feather name="check" size={12} color="#fff" />
                  </View>
                )}
                {confirmed && opt.id === selected && opt.id !== question.correctId && (
                  <View className="items-center justify-center"
                    style={{ width: 22, height: 22, borderRadius: 11, backgroundColor: '#ff6b6b', flexShrink: 0 }}
                  >
                    <Feather name="x" size={12} color="#fff" />
                  </View>
                )}
                {confirmed && opt.id !== question.correctId && opt.id !== selected && (
                  <View style={{ width: 22, height: 22, borderRadius: 11, borderWidth: 1.5, borderColor: C.outlineVariant, flexShrink: 0 }} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* ── Footer ── */}
      <View className="px-6 pb-4 pt-3" style={{ backgroundColor: C.surface }}>
        <TouchableOpacity
          onPress={handleNextStep}
          disabled={!selected}
          activeOpacity={0.85}
          className="h-14 rounded-full items-center justify-center"
          style={{
            backgroundColor: C.primaryContainer,
            opacity: !selected ? 0.4 : 1,
            shadowColor: C.primaryContainer,
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.4,
            shadowRadius: 16,
            elevation: 8,
          }}
        >
          <Text style={{ fontFamily: 'Manrope_700Bold', fontSize: 17, color: C.onPrimaryContainer }}>
            {buttonLabel}
          </Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}