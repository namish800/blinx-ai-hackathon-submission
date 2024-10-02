"use client"

import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';  // To render raw HTML
import rehypeSanitize from 'rehype-sanitize';  // To sanitize HTML
import styles from './index.module.css';

interface AnalyseVideoResponse {
  session_id: string;
  status: string;
}

interface TaskStatusResponse {
  session_id: string;
  result?: {
    state: {
      blog_post: string;
    };
    workflow_step: string;
  };
  status: string;
}

interface Analysis {
  sessionId: string;
  fileName: string;
  status: string;
  markdownContent?: string;
}

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [error, setError] = useState<string>('');

  // Load analysis from localStorage on component mount
  useEffect(() => {
    const storedAnalysis = localStorage.getItem('analysis');
    if (storedAnalysis) {
      const parsedAnalysis: Analysis = JSON.parse(storedAnalysis);
      setAnalysis(parsedAnalysis);

      // Resume polling if the analysis is still processing
      if (parsedAnalysis.status === 'processing') {
        pollStatus(parsedAnalysis.sessionId);
      }
    }
  }, []);

  // Save analysis to localStorage whenever it changes
  useEffect(() => {
    if (analysis) {
      localStorage.setItem('analysis', JSON.stringify(analysis));
    } else {
      localStorage.removeItem('analysis');
    }
  }, [analysis]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!file) {
      setError('Please upload a video file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('https://blinx-backend-eze3e9drepffcte5.centralindia-01.azurewebsites.net/analyseVideo', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data: AnalyseVideoResponse = await response.json();
      if (data.session_id) {
        const newAnalysis: Analysis = {
          sessionId: data.session_id,
          fileName: file.name,
          status: 'processing',
        };
        setAnalysis(newAnalysis);
        pollStatus(data.session_id);
        setFile(null); // Clear the file input after submission
      } else {
        setError('Failed to initiate video analysis.');
      }
    } catch (error) {
      setError('Error calling analyseVideo API.');
      console.error('Error:', error);
    }
  };

  const pollStatus = (sessionId: string) => {
    const intervalId = setInterval(async () => {
      try {
        const response = await fetch(
          `https://blinx-backend-eze3e9drepffcte5.centralindia-01.azurewebsites.net/taskStatus/${sessionId}`
        );

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data: TaskStatusResponse = await response.json();
        if (data.status === 'completed') {
          clearInterval(intervalId);
          setAnalysis((prevAnalysis) =>
            prevAnalysis && prevAnalysis.sessionId === sessionId
              ? {
                  ...prevAnalysis,
                  status: 'completed',
                  markdownContent: data.result?.state.blog_post || '',
                }
              : prevAnalysis
          );
        } else if (data.status === 'failed') {
          clearInterval(intervalId);
          setAnalysis((prevAnalysis) =>
            prevAnalysis && prevAnalysis.sessionId === sessionId
              ? { ...prevAnalysis, status: 'failed' }
              : prevAnalysis
          );
          setError('Error processing the video.');
        }
      } catch (error) {
        clearInterval(intervalId);
        setAnalysis((prevAnalysis) =>
          prevAnalysis && prevAnalysis.sessionId === sessionId
            ? { ...prevAnalysis, status: 'failed' }
            : prevAnalysis
        );
        setError('Error polling taskStatus API.');
        console.error('Error:', error);
      }
    }, 10000);
  };

  return (
    <div>
      <h1>Video Analysis</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="file"
          accept="video/*"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const selectedFile = e.target.files ? e.target.files[0] : null;
            setFile(selectedFile);
          }}
          required
        />
        <button type="submit">Analyze Video</button>
      </form>
      {error && <p className="error">{error}</p>}

      <h2>Your Analysis</h2>
      {!analysis && <p>No analysis yet.</p>}
      {analysis && (
        <div>
          <p>
            <strong>File Name:</strong> {analysis.fileName}
          </p>
          <p>
            <strong>Status:</strong> {analysis.status}
          </p>
          {analysis.status === 'completed' && analysis.markdownContent && (
            <div className={styles.markdownContent}>
              <ReactMarkdown rehypePlugins={[rehypeRaw, rehypeSanitize]}>
                {analysis.markdownContent}
              </ReactMarkdown>
            </div>
          )}
        </div>
      )}
    </div>
  );
}