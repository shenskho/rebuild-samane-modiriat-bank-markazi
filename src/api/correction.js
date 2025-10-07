import axios from '@configs/axios'
import urls from './urls'

export async function processCandidateResultSteap1() {
  return await axios.post(urls.ExamCorrelationSteps.processCandidateResultSteap1)
}
export async function calculateCandidateRawScoresSteap2() {
  return await axios.post(urls.ExamCorrelationSteps.calculateCandidateRawScoresSteap2)
}
export async function calculateCandidateScores() {
  return await axios.post(urls.ExamCorrelationSteps.calculateCandidateScores)
}

export async function calculateCandidateScoresStatus(parameter) {
  return await axios.get(urls.ExamCorrelationSteps.calculateCandidateScoresStatus + parameter)
}
export async function generateRanking() {
  return await axios.post(urls.ExamCorrelationSteps.generateRanking)
}

export async function generateRankingStatus(parameter) {
  return await axios.get(urls.ExamCorrelationSteps.generateRankingStatus + parameter)
}

export async function generateReportCards() {
  return await axios.post(urls.ExamCorrelationSteps.generateReportCards)
}

export async function generateReportCardsStatus(parameter) {
  return await axios.get(urls.ExamCorrelationSteps.generateReportCardsStatus + parameter)
}

//  processCandidateResultSteap1: `${PREFIX}/ExamCorrelationSteps/process-candidate-results?examId=1`,
//   calculateCandidateRawScoresSteap2: `${PREFIX}/ExamCorrelationSteps/calculate-candidate-raw-scores?examId=1`,
//   calculateCandidateScores: `${PREFIX}/ExamCorrelationSteps/calculate-candidate-scores?examId=1`,
//   calculateCandidateScoresStatus: `${PREFIX}/ExamCorrelationSteps/calculate-candidate-scores-status?trackingId=`,
//   generateRanking: `${PREFIX}/ExamCorrelationSteps/generate-ranking?examId=1`,
//    generateRankingStatus: `${PREFIX}/ExamCorrelationSteps/generate-ranking-status?trackingId=`,
//     generateReportCards: `${PREFIX}/ExamCorrelationSteps/generate-report-cards?examId=1`,
//      generateReportCardsStatus: `${PREFIX}/ExamCorrelationSteps/generate-report-cards-status?trackingId=`
