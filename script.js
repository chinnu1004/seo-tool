async function generateTitleAndTags() {
  const topic = document.getElementById('topicInput').value;
  const titleOutput = document.getElementById('titleOutput');
  const tagsOutput = document.getElementById('tagsOutput');

  titleOutput.innerText = 'Generating...';
  tagsOutput.innerText = '';

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer YOUR_OPENAI_API_KEY"
    },
    body: JSON.stringify({
      model: "text-davinci-003",
      prompt: `Generate an SEO-friendly YouTube video title and 5 tags for this topic: "${topic}"`,
      max_tokens: 100,
      temperature: 0.7
    })
  });

  const data = await response.json();
  const resultText = data.choices[0].text.trim();

  const [title, ...tags] = resultText.split("\n").filter(Boolean);
  titleOutput.innerText = title;
  tagsOutput.innerText = tags.join(", ");
}
