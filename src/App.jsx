import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Header from './components/Header';
import LearningJourneyBar from './components/LearningJourneyBar';
import EducationalIntro from './components/EducationalIntro';
import HeroSection from './components/HeroSection';
import LearningModeStepper from './components/LearningModeStepper';
import MissionsTracker from './components/MissionsTracker';
import WhatJustHappenedPanel from './components/WhatJustHappenedPanel';
import KpiCards from './components/KpiCards';
import PopulationVisualizer from './components/PopulationVisualizer';
import PopulationSetup from './components/PopulationSetup';
import SamplingMethod from './components/SamplingMethod';
import SampleControls from './components/SampleControls';
import SampleResults from './components/SampleResults';
import PointEstimation from './components/PointEstimation';
import ConfidenceInterval from './components/ConfidenceInterval';
import SamplingDistribution from './components/SamplingDistribution';
import CLTDemo from './components/CLTDemo';
import VoterAgeDemo from './components/VoterAgeDemo';
import DistributionLab from './components/DistributionLab';
import QuizSection from './components/QuizSection';
import EndSummaryPipeline from './components/EndSummaryPipeline';
import EducationalPanel from './components/EducationalPanel';
import Footer from './components/Footer';

// Modals
import AboutModal from './components/AboutModal';
import TeachMeModal from './components/TeachMeModal';
import HowToExplainModal from './components/HowToExplainModal';
import VivaExplanationModal from './components/VivaExplanationModal';
import PresentationMode from './components/PresentationMode';
import CompareSamplingModal from './components/CompareSamplingModal';
import StatisticsDictionaryModal from './components/StatisticsDictionaryModal';
import GuidedTour from './components/GuidedTour';
import WhyModal from './components/WhyModal';

import { DEFAULT_CONFIG } from './data/constants';
import { generatePopulation, drawSample, summarizeSample } from './utils/sampling';
import { calculateWaldProportionCI } from './utils/confidenceIntervals';

export default function App() {
  // Theme & Mode State (Default: Beginner Mode)
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLearningMode, setIsLearningMode] = useState(false);
  const [learningStep, setLearningStep] = useState(1);
  const [viewMode, setViewMode] = useState('basic'); // 'basic' (Beginner) | 'technical' (Advanced)
  const [activeJourneyStage, setActiveJourneyStage] = useState('population');
  const [isRealLifeMode, setIsRealLifeMode] = useState(true);

  // Modals Visibility
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isVivaOpen, setIsVivaOpen] = useState(false);
  const [isPresentationOpen, setIsPresentationOpen] = useState(false);
  const [isDictionaryOpen, setIsDictionaryOpen] = useState(false);
  const [isTourOpen, setIsTourOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [teachMeKey, setTeachMeKey] = useState(null);
  const [howToExplainKey, setHowToExplainKey] = useState(null);
  const [whyKey, setWhyKey] = useState(null);

  // Missions Checklist State
  const [completedMissions, setCompletedMissions] = useState([]);

  // Population Configuration State
  const [populationSize, setPopulationSize] = useState(DEFAULT_CONFIG.populationSize);
  const [pctA, setPctA] = useState(DEFAULT_CONFIG.pctA);
  const [pctB, setPctB] = useState(DEFAULT_CONFIG.pctB);
  const [pctC, setPctC] = useState(DEFAULT_CONFIG.pctC);

  // Sampling Configuration State
  const [sampleSize, setSampleSize] = useState(DEFAULT_CONFIG.sampleSize);
  const [selectedMethod, setSelectedMethod] = useState(DEFAULT_CONFIG.samplingMethod);

  // Simulation State
  const [population, setPopulation] = useState([]);
  const [currentSample, setCurrentSample] = useState([]);
  const [sampleResults, setSampleResults] = useState(null);
  const [confidenceInterval, setConfidenceInterval] = useState(null);
  const [isSimulating, setIsSimulating] = useState(false);

  // Sync Dark Mode with DOM
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  // Validation
  const totalPercentage = pctA + pctB + pctC;
  const isPopValid = totalPercentage === 100 && populationSize > 0;
  const validationError = !isPopValid
    ? populationSize <= 0
      ? 'Population size must be greater than 0.'
      : `Percentages must total 100% (currently ${totalPercentage}%).`
    : null;

  // Mark missions helper
  const completeMission = useCallback((missionId) => {
    setCompletedMissions(prev => (prev.includes(missionId) ? prev : [...prev, missionId]));
  }, []);

  // Initialize or re-generate population when parameters change
  const initializePopulation = useCallback(() => {
    if (!isPopValid) return;
    const newPop = generatePopulation(populationSize, pctA, pctB, pctC);
    setPopulation(newPop);

    // Immediately draw initial sample
    const initialSample = drawSample(newPop, Math.min(sampleSize, populationSize), selectedMethod);
    setCurrentSample(initialSample);

    const summary = summarizeSample(initialSample, populationSize);
    setSampleResults(summary);

    const ci = calculateWaldProportionCI(summary.proportions['Option A'], initialSample.length, populationSize, 0.95);
    setConfidenceInterval(ci);
  }, [populationSize, pctA, pctB, pctC, sampleSize, selectedMethod, isPopValid]);

  // Initial population mount
  useEffect(() => {
    initializePopulation();
  }, [initializePopulation]);

  // Handle single sample generation
  const handleGenerateSample = () => {
    if (!population || population.length === 0 || !isPopValid) return;

    setIsSimulating(true);
    setActiveJourneyStage('sampling');
    completeMission('mission1');

    if (sampleSize >= 500) {
      completeMission('mission2');
    }

    setTimeout(() => {
      const drawn = drawSample(population, Math.min(sampleSize, population.length), selectedMethod);
      setCurrentSample(drawn);

      const summary = summarizeSample(drawn, population.length);
      setSampleResults(summary);

      const ci = calculateWaldProportionCI(summary.proportions['Option A'], drawn.length, population.length, 0.95);
      setConfidenceInterval(ci);
      setIsSimulating(false);
      setActiveJourneyStage('sample');
    }, 150);
  };

  // Handle batch 100 samples trigger
  const handleGenerate100Samples = () => {
    setActiveJourneyStage('interval');
    completeMission('mission3');
    const elem = document.getElementById('sampling-dist-section');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
    handleGenerateSample();
  };

  // Reset simulation to original defaults
  const handleReset = () => {
    setPopulationSize(DEFAULT_CONFIG.populationSize);
    setPctA(DEFAULT_CONFIG.pctA);
    setPctB(DEFAULT_CONFIG.pctB);
    setPctC(DEFAULT_CONFIG.pctC);
    setSampleSize(DEFAULT_CONFIG.sampleSize);
    setSelectedMethod(DEFAULT_CONFIG.samplingMethod);
    setActiveJourneyStage('population');
    setLearningStep(1);
  };

  const popPercentages = useMemo(() => ({ pctA, pctB, pctC }), [pctA, pctB, pctC]);

  return (
    <div className="app-container">
      {/* 1. Sticky Navigation Header */}
      <Header
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        isLearningMode={isLearningMode}
        onToggleLearningMode={() => setIsLearningMode(!isLearningMode)}
        viewMode={viewMode}
        onToggleViewMode={() => setViewMode(viewMode === 'basic' ? 'technical' : 'basic')}
        onReset={handleReset}
        onOpenAbout={() => setIsAboutOpen(true)}
        onOpenViva={() => setIsVivaOpen(true)}
        onOpenDictionary={() => setIsDictionaryOpen(true)}
        onOpenPresentation={() => setIsPresentationOpen(true)}
        onStartTour={() => setIsTourOpen(true)}
        isRealLifeMode={isRealLifeMode}
        onToggleRealLifeMode={() => setIsRealLifeMode(!isRealLifeMode)}
      />

      {/* 2. Persistent Interactive Learning Journey Bar */}
      <LearningJourneyBar
        activeStage={activeJourneyStage}
        onSelectStage={(stg) => setActiveJourneyStage(stg)}
      />

      <main className="content-wrapper">
        {/* 3. Section 2: Educational Intro Story Banner */}
        <EducationalIntro
          onStartTutorial={() => setIsTourOpen(true)}
          onSkipToSimulator={() => {
            const el = document.getElementById('population-visualizer-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onGenerateLiveSample={handleGenerateSample}
        />

        {/* 4. Section 32: Hands-On Missions Checklist */}
        <MissionsTracker completedMissions={completedMissions} />

        {/* 5. Section 6: What Just Happened? Dynamic Action Panel */}
        <WhatJustHappenedPanel
          populationSize={populationSize}
          sampleSize={sampleSize}
          sampleResults={sampleResults}
          popPercentages={popPercentages}
          confidenceInterval={confidenceInterval}
          selectedMethod={selectedMethod}
          onExplainWhy={() => setWhyKey('sampling')}
        />

        {/* 6. Step-by-Step Classroom Learning Stepper (When Enabled) */}
        {isLearningMode && (
          <LearningModeStepper
            currentStep={learningStep}
            setCurrentStep={setLearningStep}
            totalSteps={9}
            onExitLearningMode={() => setIsLearningMode(false)}
          />
        )}

        {/* 7. Educational KPI Cards with Sparklines */}
        <KpiCards
          populationSize={populationSize}
          sampleSize={sampleSize}
          sampleResults={sampleResults}
          confidenceInterval={confidenceInterval}
        />

        {/* 8. Interactive Population & Sample Extraction Matrix */}
        <PopulationVisualizer
          populationSize={populationSize}
          sampleSize={sampleSize}
          sampleResults={sampleResults}
          popPercentages={popPercentages}
          onGenerateSample={handleGenerateSample}
          isSimulating={isSimulating}
          onOpenTeachMe={(k) => setTeachMeKey(k)}
          onOpenWhy={(k) => setWhyKey(k)}
          onOpenHowToExplain={(k) => setHowToExplainKey(k)}
        />

        {/* 9. Population Setup & Sampling Setup Grid */}
        <div className="grid-2 dashboard-section">
          <PopulationSetup
            populationSize={populationSize}
            setPopulationSize={setPopulationSize}
            pctA={pctA}
            setPctA={setPctA}
            pctB={pctB}
            setPctB={setPctB}
            pctC={pctC}
            setPctC={setPctC}
            isValid={isPopValid}
            validationError={validationError}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <SamplingMethod
              selectedMethod={selectedMethod}
              setSelectedMethod={(m) => {
                setSelectedMethod(m);
                setActiveJourneyStage('sampling');
              }}
              onOpenCompare={() => setIsCompareOpen(true)}
              onOpenWhy={(k) => setWhyKey(k)}
              onOpenHowToExplain={(k) => setHowToExplainKey(k)}
            />

            <SampleControls
              populationSize={populationSize}
              sampleSize={sampleSize}
              setSampleSize={(sz) => {
                setSampleSize(sz);
                setActiveJourneyStage('sampling');
                if (sz >= 500) completeMission('mission2');
              }}
              onGenerateSample={handleGenerateSample}
              onGenerate100Samples={handleGenerate100Samples}
              onReset={handleReset}
              isSimulating={isSimulating}
              isValid={isPopValid}
            />
          </div>
        </div>

        {/* 10. Split-Screen Population vs Sample Comparison */}
        <div id="sample-results-section" className="dashboard-section">
          <SampleResults
            populationSize={populationSize}
            sampleSize={currentSample.length}
            popPercentages={popPercentages}
            sampleResults={sampleResults}
            confidenceInterval={confidenceInterval}
          />
        </div>

        {/* 11. Point Estimation (Sections 15, 16, 17) */}
        <div className="dashboard-section">
          <PointEstimation
            populationSize={populationSize}
            sampleResults={sampleResults}
            popPercentages={popPercentages}
            viewMode={viewMode}
            onOpenTeachMe={(k) => setTeachMeKey(k)}
            onOpenWhy={(k) => setWhyKey(k)}
            onOpenHowToExplain={(k) => setHowToExplainKey(k)}
          />
        </div>

        {/* 12. Confidence Interval Visualizer (Sections 18, 19, 26) */}
        <div className="dashboard-section">
          <ConfidenceInterval
            population={population}
            populationSize={populationSize}
            sampleSize={currentSample.length}
            sampleResults={sampleResults}
            popPercentages={popPercentages}
            viewMode={viewMode}
            onOpenTeachMe={(k) => setTeachMeKey(k)}
            onOpenWhy={(k) => setWhyKey(k)}
            onOpenHowToExplain={(k) => setHowToExplainKey(k)}
          />
        </div>

        {/* 13. Sampling Distribution of the Sample Proportion (Section 20) */}
        <div className="dashboard-section">
          <SamplingDistribution
            population={population}
            popPercentages={popPercentages}
            onOpenTeachMe={(k) => setTeachMeKey(k)}
            onOpenWhy={(k) => setWhyKey(k)}
            onOpenHowToExplain={(k) => setHowToExplainKey(k)}
          />
        </div>

        {/* 14. Central Limit Theorem Visual Laboratory (Section 21) */}
        <div className="dashboard-section">
          <CLTDemo
            population={population}
            popPercentages={popPercentages}
            onOpenTeachMe={(k) => setTeachMeKey(k)}
            onOpenWhy={(k) => setWhyKey(k)}
            onOpenHowToExplain={(k) => setHowToExplainKey(k)}
          />
        </div>

        {/* 15. Continuous Variable Inference (Voter Age) */}
        <div className="dashboard-section">
          <VoterAgeDemo
            population={population}
            sample={currentSample}
            populationSize={populationSize}
            viewMode={viewMode}
          />
        </div>

        {/* 16. Unified Distribution Lab (Sections 22, 23, 24, 25) */}
        <div className="dashboard-section">
          <DistributionLab
            sampleResults={sampleResults}
            popPercentages={popPercentages}
            sampleSize={currentSample.length}
            viewMode={viewMode}
            onOpenHowToExplain={(k) => setHowToExplainKey(k)}
          />
        </div>

        {/* 17. Section 31: Can You Explain It? Self-Check Quiz */}
        <div className="dashboard-section">
          <QuizSection />
        </div>

        {/* 18. Section 38: The Whole Idea in One Picture Summary Pipeline */}
        <div className="dashboard-section">
          <EndSummaryPipeline
            populationSize={populationSize}
            sampleSize={sampleSize}
            sampleResults={sampleResults}
            confidenceInterval={confidenceInterval}
            onOpenVivaModal={() => setIsVivaOpen(true)}
          />
        </div>

        {/* 19. Educational Summary Cards */}
        <div className="dashboard-section">
          <EducationalPanel />
        </div>
      </main>

      {/* 20. Minimalist Academic Footer */}
      <Footer onOpenAbout={() => setIsAboutOpen(true)} />

      {/* MODALS */}
      {/* About Dialog Modal */}
      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />

      {/* Step-by-Step "Teach Me" Modal */}
      <TeachMeModal
        lessonKey={teachMeKey}
        isOpen={Boolean(teachMeKey)}
        onClose={() => setTeachMeKey(null)}
      />

      {/* "How Do I Explain This?" Viva Pitch Modal */}
      <HowToExplainModal
        explainKey={howToExplainKey}
        isOpen={Boolean(howToExplainKey)}
        onClose={() => setHowToExplainKey(null)}
      />

      {/* "Why?" Quick Rationale Modal */}
      <WhyModal
        whyKey={whyKey}
        isOpen={Boolean(whyKey)}
        onClose={() => setWhyKey(null)}
      />

      {/* "Explain This Project" / Full Viva Preparation Deck Modal */}
      <VivaExplanationModal
        isOpen={isVivaOpen}
        onClose={() => setIsVivaOpen(false)}
      />

      {/* 10-Slide Presentation Mode Deck */}
      <PresentationMode
        isOpen={isPresentationOpen}
        onClose={() => setIsPresentationOpen(false)}
      />

      {/* Side-by-Side Sampling Methods Comparison Modal */}
      <CompareSamplingModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
      />

      {/* Interactive Statistics Dictionary Modal */}
      <StatisticsDictionaryModal
        isOpen={isDictionaryOpen}
        onClose={() => setIsDictionaryOpen(false)}
      />

      {/* 60-Second Guided Tour Spotlight */}
      <GuidedTour
        isOpen={isTourOpen}
        onClose={() => setIsTourOpen(false)}
      />
    </div>
  );
}
