import { Feather, Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ─── Design Tokens ────────────────────────────────────────────────────────────
const C = {
  surface:                '#16111b',
  surfaceContainerLowest: '#110c16',
  surfaceContainerLow:    '#1f1924',
  surfaceContainer:       '#231d28',
  surfaceContainerHigh:   '#2e2832',
  surfaceContainerHighest:'#39323d',
  primaryContainer:       '#8a2be2',
  onPrimaryContainer:     '#eed9ff',
  primary:                '#dcb8ff',
  onSurface:              '#eadfee',
  onSurfaceVariant:       '#cfc2d7',
  outlineVariant:         '#4c4354',
  secondaryContainer:     '#5d3587',
  onSecondaryContainer:   '#d2a6ff',
};

export default function Screen1() {
  const [description, setDescription] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const pressAnim = useRef(new Animated.Value(1)).current;

  const maxChars = 1000;
  
  const [activeTab, setActiveTab] = useState<'descricao' | 'arquivos'>('descricao');
  function handleUploadPress() {
    Animated.sequence([
      Animated.timing(pressAnim, { toValue: 0.97, duration: 80, useNativeDriver: true }),
      Animated.timing(pressAnim, { toValue: 1, duration: 80, useNativeDriver: true }),
    ]).start();
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
     
        {/* ── Header ── */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={20} color={C.onSurface} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Adicionar conteúdo</Text>
          <View style={{ width: 40 }} />
        </View>


        {/* Tab Selector */}
<View style={styles.tabContainer}>
  <TouchableOpacity
    style={[styles.tab, activeTab === 'descricao' && styles.tabActive]}
    onPress={() => setActiveTab('descricao')}
    activeOpacity={0.7}
  >
    <Text style={[styles.tabText, activeTab === 'descricao' && styles.tabTextActive]}>
      Descrição
    </Text>
  </TouchableOpacity>
  <TouchableOpacity
    style={[styles.tab, activeTab === 'arquivos' && styles.tabActive]}
    onPress={() => setActiveTab('arquivos')}
    activeOpacity={0.7}
  >
    <Text style={[styles.tabText, activeTab === 'arquivos' && styles.tabTextActive]}>
      Arquivos
    </Text>
  </TouchableOpacity>
</View>

       <KeyboardAwareScrollView
  style={{ flex: 1 }}
  contentContainerStyle={styles.scrollContent}
  showsVerticalScrollIndicator={false}
  keyboardShouldPersistTaps="handled"
  enableOnAndroid={true}
  extraScrollHeight={20}
>   


            {activeTab === 'descricao' && (
         
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.iconBox}>
                <Feather name="edit-2" size={22} color={C.primaryContainer} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.sectionTitle}>Descrição do estudo</Text>
                <Text style={styles.sectionSubtitle}>
                  Conte o que você quer focar e deixe a{' '}
                  <Text style={{ color: C.primaryContainer, fontFamily: 'Manrope_600SemiBold' }}>
                    Elix
                  </Text>{' '}
                  criar sua revisão ideal
                </Text>
              </View>
            </View>

            {/* Textarea */}
            <View
              style={[
                styles.textAreaWrapper,
                isFocused && styles.textAreaWrapperFocused,
              ]}
            >
              <TextInput
                style={styles.textArea}
                placeholder="Ex: revisar hipotálamo, neuro-hipófise e glândula tireoide"
                placeholderTextColor={C.onSurfaceVariant + '80'}
                multiline
                maxLength={maxChars}
                value={description}
                onChangeText={setDescription}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                textAlignVertical="top"
              />
              <Text style={styles.charCount}>
                {description.length}/{maxChars}
              </Text>
            </View>
          </View>

          )}


          {activeTab === 'arquivos' && (
      
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.iconBox}>
                <Feather name="file-text" size={22} color={C.primaryContainer} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.sectionTitle}>Materiais</Text>
                <Text style={styles.sectionSubtitle}>PDFs, slides ou anotações</Text>
              </View>
            </View>

            {/* Upload area com borda tracejada */}
            <Animated.View style={{ transform: [{ scale: pressAnim }] }}>
              <TouchableOpacity
                onPress={handleUploadPress}
                activeOpacity={0.8}
                style={styles.uploadArea}
              >
                {/* Borda tracejada simulada com View aninhadas */}
                <View style={styles.uploadInner}>
                  <View style={styles.uploadIconWrapper}>
                    <Feather name="file-text" size={32} color={C.primaryContainer} />
                  </View>
                  <Text style={styles.uploadTitle}>Selecionar arquivos</Text>
                  <Text style={styles.uploadSubtitle}>
                    Escolha arquivos do seu dispositivo
                  </Text>
                </View>
              </TouchableOpacity>
            </Animated.View>
          </View>
          )}

          {/* Espaço para o botão fixo não cobrir conteúdo */}
        
        </KeyboardAwareScrollView>

        {/* ── Botão Gerar fixo ── */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.generateButton}
            activeOpacity={0.85}
            onPress={() => {}}
          >
            <Text style={styles.generateButtonText}>Gerar</Text>
            <Ionicons name="sparkles" size={20} color={C.onPrimaryContainer} />
          </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: C.surface,
  },

  // ── Header ──
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  tabContainer: {
  flexDirection: 'row',
  backgroundColor: C.surfaceContainerHigh,
  marginHorizontal: 20,
  marginBottom: 20,
  borderRadius: 12,
  padding: 4,
},
tab: {
  flex: 1,
  paddingVertical: 10,
  alignItems: 'center',
  borderRadius: 10,
},
tabActive: {
  backgroundColor: C.surfaceContainerHighest,
},
tabText: {
  fontFamily: 'Manrope_500Medium',
  fontSize: 14,
  color: C.onSurfaceVariant,
},
tabTextActive: {
  fontFamily: 'Manrope_600SemiBold',
  color: C.onSurface,
},
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: C.surfaceContainer,
    borderWidth: 1,
    borderColor: C.outlineVariant,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 17,
    color: C.onSurface,
  },

  // ── Scroll ──
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
  },

  // ── Seções ──
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
    marginBottom: 16,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: C.surfaceContainer,
    borderWidth: 1,
    borderColor: C.primaryContainer + '80',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 17,
    color: C.onSurface,
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 13,
    color: C.onSurfaceVariant,
    lineHeight: 18,
  },

  // ── TextArea ──
  textAreaWrapper: {
    backgroundColor: C.surfaceContainer + '80',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: C.outlineVariant,
    padding: 16,
    minHeight: 30,
  },
  textAreaWrapperFocused: {
    borderColor: C.primaryContainer,
    shadowColor: C.primaryContainer,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  textArea: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 15,
    color: C.onSurface,
    minHeight: 30,
    lineHeight: 24,
  },
  charCount: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 13,
    color: C.onSurfaceVariant + '99',
    textAlign: 'right',
    marginTop: 8,
  },

  // ── Upload ──
  uploadArea: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  uploadInner: {
    minHeight: 140,
    backgroundColor: C.surfaceContainer + '50',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: C.primaryContainer,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 24,
  },
  uploadIconWrapper: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: C.primaryContainer + '20',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadTitle: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 15,
    color: C.onSurface,
  },
  uploadSubtitle: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 13,
    color: C.onSurfaceVariant,
  },

  // ── Footer ──
  footer: {
  paddingHorizontal: 20,
  paddingBottom: Platform.OS === 'ios' ? 16 : 24,
  paddingTop: 12,
  backgroundColor: C.surface,
},
  generateButton: {
    height: 60,
    backgroundColor: C.primaryContainer,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: C.primaryContainer,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },
  generateButtonText: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 17,
    color: C.onPrimaryContainer,
  },
});