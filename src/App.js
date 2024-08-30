import { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Container } from '@mui/material';
import dayjs from 'dayjs';
import './App.css';
import Header from './components/Header';
import WebinarContainer from './components/WebinarContainer';
import userAvatar from './public/images/userAvatar.png';
import { getRandomColor } from './utils/helper';

function App() {
  const [webinars, setWebinars] = useState(() => {
    const savedWebinars = localStorage.getItem('webinars');
    return savedWebinars ? JSON.parse(savedWebinars) : [{
      instructorName: "Matthew Martin",
      instructorRole: "Lead Front End Developer",
      instructorCompany: "Google",
      instructorTopics: "Front End Engineering",
      instructorAvatar: userAvatar,
      webinarTitle: "React and React Native",
      startDate: dayjs().startOf('day'),
      startTime: dayjs(),
      endTime: dayjs().add(1, 'hour'),
      randomColor: getRandomColor()
    }];
  });

  const [open, setOpen] = useState(false);
  const [selectedWebinar, setSelectedWebinar] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    localStorage.setItem('webinars', JSON.stringify(webinars));
  }, [webinars]);

  const handleOpen = () => {setOpen(true)};
  const handleClose = () => setOpen(false);

  const handleAddWebinarClick = () => {
    setOpen(true);
    setIsEdit(false);
    setSelectedWebinar(null);
  };

  const handleSelection = (event) => {
    setSelectedTopic(event.target.value);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleDeleteWebinar = (index) => {
    const updatedWebinars = webinars.filter((_, i) => i !== index);
    setWebinars(updatedWebinars);
  };

  const handleEditWebinar = (index) => {
    const webinarToEdit = webinars[index];
    setSelectedWebinar(webinarToEdit);
    setIsEdit(true);
    handleOpen();
  };

  const handleAddWebinar = (newWebinar) => {
    setWebinars((prevWebinars) => [...prevWebinars, newWebinar]);
  };

  const filteredWebinars = webinars.filter((webinar) => {
    return (
      (selectedTopic === "" || webinar.instructorTopics === selectedTopic) &&
      (webinar.instructorName.toLowerCase().includes(search.toLowerCase()) ||
        webinar.instructorTopics.toLowerCase().includes(search.toLowerCase()) ||
        webinar.webinarTitle.toLowerCase().includes(search.toLowerCase()) ||
        webinar.instructorCompany
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        webinar.instructorRole.toLowerCase().includes(search.toLowerCase()))
    );
  });

  const allTopics = [
    ...new Set(webinars.map((webinar) => webinar.instructorTopics)),
  ];
  if (selectedTopic && !allTopics.includes(selectedTopic)) {
    allTopics.push(selectedTopic);
  }

  return (
    <div className="App">
      <CssBaseline />
      <Container sx={{ maxWidth: "115rem !important" }}>
        <Header
          handleAddWebinarClick={handleAddWebinarClick}
          handleAddWebinar={handleAddWebinar}
          isEdit={isEdit}
          webinars={webinars}
          webinar={selectedWebinar}
          setWebinars={setWebinars}
          open={open}
          handleClose={handleClose}
          handleOpen={handleOpen}
        />
        <WebinarContainer
          handleDelete={handleDeleteWebinar}
          searchValue={search}
          allTopics={allTopics}
          handleSelection={handleSelection}
          handleSearch={handleSearch}
          handleEdit={handleEditWebinar}
          webinars={filteredWebinars}
        />
      </Container>
    </div>
  );
}

export default App;
