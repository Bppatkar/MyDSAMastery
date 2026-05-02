import React, { useState } from 'react';
import { INTERVIEW_QUESTIONS } from '../data/interviewQuestions';
import { useTheme } from '../context/ThemeContext';

export default function InterviewQuestionsPage() {
  const { isDark } = useTheme();
  const [selectedId, setSelectedId] = useState(null);
  const [filterDifficulty, setFilterDifficulty] = useState('All');

  const difficulties = ['All', 'Easy', 'Medium', 'Hard'];

  const filteredQuestions =
    filterDifficulty === 'All'
      ? INTERVIEW_QUESTIONS
      : INTERVIEW_QUESTIONS.filter((q) => q.difficulty === filterDifficulty);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy':
        return isDark ? 'text-green-400' : 'text-green-600';
      case 'Medium':
        return isDark ? 'text-yellow-400' : 'text-yellow-600';
      case 'Hard':
        return isDark ? 'text-red-400' : 'text-red-600';
      default:
        return '';
    }
  };

  const getDifficultyBg = (difficulty) => {
    switch (difficulty) {
      case 'Easy':
        return isDark ? 'bg-green-900/20' : 'bg-green-100';
      case 'Medium':
        return isDark ? 'bg-yellow-900/20' : 'bg-yellow-100';
      case 'Hard':
        return isDark ? 'bg-red-900/20' : 'bg-red-100';
      default:
        return '';
    }
  };

  return (
    <div
      className={`flex flex-col h-full w-full ${isDark ? 'bg-[#1a1a1a]' : 'bg-[#f7f5f0]'} transition-colors`}
    >
      {/* Header */}
      <div
        className={`flex-shrink-0 p-4 md:p-6 border-b ${isDark ? 'border-[#444] bg-[#2a2a2a]' : 'border-[#e4e2db] bg-white'} transition-colors`}
      >
        <h1
          className={`text-2xl md:text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-[#1c1b19]'}`}
        >
          🎤 Most Frequently Asked Interview Questions
        </h1>
        <p
          className={`text-sm md:text-base ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
        >
          Learn detailed solving steps (not code) for top DSA interview problems
        </p>
      </div>

      {/* Filters */}
      <div
        className={`flex-shrink-0 p-4 md:p-6 flex flex-wrap gap-2 md:gap-3 ${isDark ? 'bg-[#2a2a2a] border-b border-[#444]' : 'bg-white border-b border-[#e4e2db]'} transition-colors`}
      >
        {difficulties.map((diff) => (
          <button
            key={diff}
            onClick={() => setFilterDifficulty(diff)}
            className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full text-sm font-medium transition-all ${
              filterDifficulty === diff
                ? `${getDifficultyBg(diff)} ${getDifficultyColor(diff)} font-bold`
                : isDark
                  ? 'bg-[#444] text-gray-300 hover:bg-[#555]'
                  : 'bg-[#e4e2db] text-gray-700 hover:bg-gray-300'
            }`}
          >
            {diff}
          </button>
        ))}
      </div>

      {/* Questions List */}
      <div className={`flex-1 overflow-y-auto`}>
        <div className="p-4 md:p-6 space-y-3 md:space-y-4 max-w-6xl mx-auto">
          {filteredQuestions.map((question) => (
            <div
              key={question.id}
              onClick={() =>
                setSelectedId(selectedId === question.id ? null : question.id)
              }
              className={`p-4 md:p-5 rounded-lg cursor-pointer transition-all ${
                isDark
                  ? selectedId === question.id
                    ? 'bg-[#333] border border-[#555]'
                    : 'bg-[#2a2a2a] border border-[#444] hover:border-[#666]'
                  : selectedId === question.id
                    ? 'bg-white border-2 border-[#185FA5] shadow-lg'
                    : 'bg-white border border-[#e4e2db] hover:shadow-md'
              }`}
            >
              {/* Question Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 md:gap-3">
                <div className="flex-1">
                  <h3
                    className={`text-base md:text-lg font-bold ${isDark ? 'text-white' : 'text-[#1c1b19]'}`}
                  >
                    {question.id}. {question.question}
                  </h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span
                      className={`text-xs md:text-sm font-medium px-2 py-1 rounded-full ${getDifficultyBg(question.difficulty)} ${getDifficultyColor(question.difficulty)}`}
                    >
                      {question.difficulty}
                    </span>
                    <span
                      className={`text-xs md:text-sm font-medium px-2 py-1 rounded-full ${isDark ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-700'}`}
                    >
                      {question.pattern}
                    </span>
                  </div>
                </div>
                <div
                  className={`text-xl flex-shrink-0 ${selectedId === question.id ? 'rotate-180' : ''} transition-transform`}
                >
                  ▼
                </div>
              </div>

              {/* Question Details - Expanded */}
              {selectedId === question.id && (
                <div className="mt-4 md:mt-5 pt-4 md:pt-5 border-t border-inherit space-y-4">
                  {/* Solving Steps */}
                  <div>
                    <h4
                      className={`font-bold text-sm md:text-base mb-3 ${isDark ? 'text-blue-300' : 'text-blue-700'}`}
                    >
                      📝 Solving Steps:
                    </h4>
                    <ol
                      className={`space-y-2 text-sm md:text-base ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
                    >
                      {question.steps.map((step, idx) => (
                        <li key={idx} className="flex gap-3">
                          <span
                            className={`font-bold flex-shrink-0 w-6 text-center ${isDark ? 'text-blue-400' : 'text-blue-600'}`}
                          >
                            {idx + 1}.
                          </span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Interview Tip */}
                  <div
                    className={`p-3 md:p-4 rounded-lg ${isDark ? 'bg-amber-900/20 border border-amber-800/30' : 'bg-amber-50 border border-amber-200'}`}
                  >
                    <p
                      className={`text-sm md:text-base font-medium ${isDark ? 'text-amber-300' : 'text-amber-900'}`}
                    >
                      💡 Interview Tip:
                    </p>
                    <p
                      className={`text-sm md:text-base mt-1 ${isDark ? 'text-amber-200' : 'text-amber-800'}`}
                    >
                      {question.interviewTip}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Footer Info */}
      <div
        className={`flex-shrink-0 p-4 md:p-6 text-center text-xs md:text-sm ${isDark ? 'bg-[#2a2a2a] border-t border-[#444] text-gray-400' : 'bg-white border-t border-[#e4e2db] text-gray-600'}`}
      >
        <p>
          ✨ Focus on understanding the approach, not memorizing code. Practice
          implementing these steps!
        </p>
      </div>
    </div>
  );
}
