import { useState } from 'react';
import { Layout } from './Layout';
import Section from './Section/Section';
import Statistics from './Statistics/Statistics';
import FeedbackOptions from './FeedbackOptions/FeedbackOptions';
import Notification from './Notification/Notification';

const optionList = {
  good: 'good',
  neutral: 'neutral',
  bad: 'bad',
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const countTotalFeedback = () => {
    // return [good, neutral, bad].reduce((total, val) => total + val, 0);
    return good + neutral + bad;
  };

  const countPositiveFeedbackPercentage = () => {
    const total = countTotalFeedback();
    return Math.round((good * 100) / total) || 0;
  };

  const onLeaveFeedback = option => {
    switch (option) {
      case optionList.good:
        setGood(prev => prev + 1);
        break;

      case optionList.neutral:
        setNeutral(prev => prev + 1);
        break;

      case optionList.bad:
        setBad(prev => prev + 1);
        break;

      default:
        throw new Error('Unsupported option type');
    }
  };

  const total = countTotalFeedback();
  const positivePercentage = countPositiveFeedbackPercentage();

  return (
    <Layout>
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={Object.values(optionList)}
          onLeaveFeedback={onLeaveFeedback}
        ></FeedbackOptions>
      </Section>

      <Section title="Statistics">
        {total > 0 ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={total}
            positivePercentage={positivePercentage}
          ></Statistics>
        ) : (
          <Notification message="There is no feedback"></Notification>
        )}
      </Section>
    </Layout>
  );
};

export default App;
