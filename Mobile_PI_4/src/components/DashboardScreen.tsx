import React from 'react';
import { StyleSheet, View, ImageBackground, Text, Dimensions, ScrollView, StatusBar } from 'react-native';
import { BarChart, LineChart, Grid, XAxis } from 'react-native-svg-charts';
import { Text as SVGText, Defs, LinearGradient, Stop } from 'react-native-svg';
import * as scale from 'd3-scale';

const screenWidth = Dimensions.get('window').width;

export default function DashboardScreen() {
  const estatisticas = [
    { label: 'Média', value: 25.73 },
    { label: 'Moda', value: 25.5 },
    { label: 'Mediana', value: 25.4 },
  ];

  const comparativos = [
    { label: 'Mínimo', value: 17.6 },
    { label: 'P25', value: 24.7 },
    { label: 'P50', value: 25.4 },
    { label: 'P75', value: 27 },
    { label: 'Máximo', value: 31.6 },
  ];

  // Gradiente para gráfico de barras
  const BarGradient = () => (
    <Defs key={'gradient'}>
      <LinearGradient id={'barGradient'} x1={'0%'} y1={'0%'} x2={'0%'} y2={'100%'}>
        <Stop offset={'0%'} stopColor={'#4FC3F7'} stopOpacity={1} />
        <Stop offset={'50%'} stopColor={'#29B6F6'} stopOpacity={0.9} />
        <Stop offset={'100%'} stopColor={'#0288D1'} stopOpacity={0.8} />
      </LinearGradient>
    </Defs>
  );

  // Gradiente para gráfico de linha
  const LineGradient = () => (
    <Defs key={'lineGradient'}>
      <LinearGradient id={'lineGradient'} x1={'0%'} y1={'0%'} x2={'100%'} y2={'0%'}>
        <Stop offset={'0%'} stopColor={'#FF6B6B'} stopOpacity={1} />
        <Stop offset={'30%'} stopColor={'#FF8E53'} stopOpacity={0.9} />
        <Stop offset={'60%'} stopColor={'#FF6B9D'} stopOpacity={0.8} />
        <Stop offset={'100%'} stopColor={'#C44569'} stopOpacity={0.9} />
      </LinearGradient>
    </Defs>
  );

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <ImageBackground
        source={require('../../assets/background.png')}
        resizeMode="cover"
        style={styles.background}
      >
        {/* Overlay com gradiente */}
        <View style={styles.overlay} />
        
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={true}
          bounces={true}
          alwaysBounceVertical={true}
        >
          <View style={styles.container}>
            {/* Header melhorado */}
            <View style={styles.header}>
              <Text style={styles.title}>🌤️ Analítico do Clima</Text>
              <Text style={styles.subtitle}>Últimos 90 dias</Text>
              <View style={styles.headerDivider} />
            </View>

            {/* GRÁFICO DE BARRAS - Estatísticas Centrais */}
            <View style={styles.chartCard}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>📊 Estatísticas Centrais</Text>
                <View style={styles.cardIcon}>
                  <Text style={styles.iconText}>°C</Text>
                </View>
              </View>
              
              <BarChart
                style={styles.chart}
                data={estatisticas}
                yAccessor={({ item }) => item.value}
                svg={{ fill: 'url(#barGradient)', rx: 6 }}
                contentInset={{ top: 20, bottom: 10 }}
                spacingInner={0.3}
                animate
              >
                <Grid 
                  svg={{ 
                    strokeDasharray: [2, 4], 
                    stroke: 'rgba(255,255,255,0.2)',
                    strokeWidth: 1 
                  }} 
                />
                <BarGradient />
                {({ x, y, bandwidth }) =>
                  estatisticas.map((item, index) => (
                    <SVGText
                      key={index}
                      x={x(index) + bandwidth / 2}
                      y={y(item.value) - 8}
                      fontSize={12}
                      fill="#ffffff"
                      fontWeight="bold"
                      alignmentBaseline="middle"
                      textAnchor="middle"
                      stroke="#000"
                      strokeWidth={0.5}
                    >
                      {item.value}°
                    </SVGText>
                  ))
                }
              </BarChart>

              <XAxis
                style={styles.axis}
                data={estatisticas}
                formatLabel={(value, index) => estatisticas[index].label}
                contentInset={{ left: 15, right: 15 }}
                scale={scale.scaleBand}
                svg={{ fontSize: 12, fill: '#E8F4FD', fontWeight: '600' }}
              />

              <View style={styles.statsGrid}>
                {estatisticas.map((item, index) => (
                  <View key={index} style={styles.statItem}>
                    <Text style={styles.statLabel}>{item.label}</Text>
                    <Text style={styles.statValue}>{item.value}°C</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* GRÁFICO DE LINHA - Comparativos */}
            <View style={styles.chartCard}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>📈 Distribuição Percentual</Text>
                <View style={styles.cardIcon}>
                  <Text style={styles.iconText}>%</Text>
                </View>
              </View>
              
              <LineChart
                style={styles.chart}
                data={comparativos.map(i => i.value)}
                svg={{ 
                  stroke: 'url(#lineGradient)', 
                  strokeWidth: 3,
                  strokeLinecap: 'round',
                  strokeLinejoin: 'round'
                }}
                contentInset={{ top: 20, bottom: 10 }}
                animate
              >
                <Grid 
                  svg={{ 
                    strokeDasharray: [2, 4], 
                    stroke: 'rgba(255,255,255,0.2)',
                    strokeWidth: 1 
                  }} 
                />
                <LineGradient />
              </LineChart>

              <XAxis
                style={styles.axis}
                data={comparativos}
                formatLabel={(value, index) => comparativos[index].label}
                contentInset={{ left: 15, right: 15 }}
                scale={scale.scaleBand}
                svg={{ fontSize: 12, fill: '#FFE8E8', fontWeight: '600' }}
              />

              <View style={styles.statsGrid}>
                {comparativos.map((item, index) => (
                  <View key={index} style={styles.statItem}>
                    <Text style={styles.statLabel}>{item.label}</Text>
                    <Text style={styles.statValue}>{item.value}°C</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Card adicional para mais dados */}
            <View style={styles.chartCard}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>🌡️ Resumo Geral</Text>
                <View style={styles.cardIcon}>
                  <Text style={styles.iconText}>ℹ️</Text>
                </View>
              </View>
              
              <View style={styles.summaryGrid}>
                <View style={styles.summaryItem}>
                  <Text style={styles.summaryLabel}>Amplitude Térmica</Text>
                  <Text style={styles.summaryValue}>14.0°C</Text>
                  <Text style={styles.summaryDescription}>Máx - Mín</Text>
                </View>
                <View style={styles.summaryItem}>
                  <Text style={styles.summaryLabel}>Estabilidade</Text>
                  <Text style={styles.summaryValue}>Alta</Text>
                  <Text style={styles.summaryDescription}>Baixa variação</Text>
                </View>
                <View style={styles.summaryItem}>
                  <Text style={styles.summaryLabel}>Tendência</Text>
                  <Text style={styles.summaryValue}>🔄 Estável</Text>
                  <Text style={styles.summaryDescription}>Sem alterações</Text>
                </View>
              </View>
            </View>

            {/* Footer com informações adicionais */}
            <View style={styles.footer}>
              
              {/* Link para mais detalhes */}
              <View style={styles.linkContainer}>
                <Text style={styles.linkTitle}>📊 Relatório Completo</Text>
                <Text style={styles.linkDescription}>
                  Para análises detalhadas e relatórios completos, acesse:
                </Text>
                <Text style={styles.linkUrl}>
                  https://lookerstudio.google.com/u/0/reporting/14699bb1-d3a1-44e4-8d66-d88243dbcd2c/page/nEsNF
                </Text>
                <Text style={styles.linkHelper}>
                  📱 Toque e segure para copiar o link
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: StatusBar.currentHeight + 20 || 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: '800',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 4,
    fontWeight: '500',
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  headerDivider: {
    width: 60,
    height: 3,
    backgroundColor: '#4FC3F7',
    borderRadius: 2,
    marginTop: 12,
  },
  chartCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    marginBottom: 20,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 16,
    elevation: 8,
    backdropFilter: 'blur(10px)',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '700',
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  cardIcon: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  iconText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  chart: {
    height: 180,
    borderRadius: 12,
    marginVertical: 8,
  },
  axis: {
    marginHorizontal: -15,
    height: 28,
    marginTop: 8,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.2)',
  },
  statItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 12,
    minWidth: '30%',
    marginBottom: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  statLabel: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 11,
    fontWeight: '500',
    marginBottom: 4,
    textAlign: 'center',
  },
  statValue: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  summaryGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  summaryItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 16,
    padding: 16,
    width: '31%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: 12,
  },
  summaryLabel: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 8,
  },
  summaryValue: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  summaryDescription: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 10,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  footer: {
    alignItems: 'center',
    marginTop: 16,
    paddingTop: 20,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.2)',
  },
  footerText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '500',
    marginBottom: 8,
  },
  footerSubtext: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 10,
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 20,
  },
  linkContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 16,
    padding: 20,
    width: '100%',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
  },
  linkTitle: {
    color: '#4FC3F7',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  linkDescription: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 18,
  },
  linkUrl: {
    color: '#FFE082',
    fontSize: 11,
    textAlign: 'center',
    fontFamily: 'monospace',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 224, 130, 0.3)',
  },
  linkHelper: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 10,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});