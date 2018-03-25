function recency(findInterview, interviews) {
  let r = interviews.findIndex(findInterview);
  if (r === -1) {
    r = interviews.length + 1;
  }
  return r;
}

function hostRecency(name, interviews) {
  return recency(
    interview => name === interview.host,
    interviews,
  );
}

function interviewerRecency(name, interviews) {
  return recency(
    interview => name === interview.morningPair || name === interview.afternoonPair,
    interviews,
  );
}

export function sortInterviews(interviews) {
  return interviews.sort((interview1, interview2) => {
    if (interview1.date !== interview2.date) {
      return Date.parse(interview2.date) - Date.parse(interview1.date);
    }
    return interview1.id > interview2.id;
  });
}

export function sortHosts(hosts, interviews) {
  const sortedInterviews = sortInterviews(interviews);
  return hosts.sort((host1, host2) => {
    const recency1 = hostRecency(host1.name, sortedInterviews);
    const recency2 = hostRecency(host2.name, sortedInterviews);
    if (recency1 !== recency2) {
      return recency2 - recency1;
    }
    return host1.name > host2.name;
  });
}

export function sortInterviewers(interviewers, interviews) {
  const sortedInterviews = sortInterviews(interviews);
  return interviewers.sort((interviewer1, interviewer2) => {
    const recency1 = interviewerRecency(interviewer1.name, sortedInterviews);
    const recency2 = interviewerRecency(interviewer2.name, sortedInterviews);
    if (recency1 !== recency2) {
      return recency2 - recency1;
    }
    return interviewer1.name > interviewer2.name;
  });
}
