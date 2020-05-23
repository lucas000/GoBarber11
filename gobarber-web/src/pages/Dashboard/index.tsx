import React, { useState, useCallback } from 'react';
import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import { FiPower, FiClock } from 'react-icons/fi';
import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  Calender,
  NextAppointment,
  Section,
  Appointment } from './styles';

import logoImg from '../../assets/logo.svg';
import { useAuth } from '../../hooks/auth';

const Dashboard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = useCallback(
    (day: Date, modifiers: DayModifiers) => {
      if(modifiers.available){
        setSelectedDate(day);
      }
    },
    []
  );
  const { signOut, user } = useAuth();

  return (
    <Container>
    <Header>
      <HeaderContent>
        <img src={logoImg} alt="GoBarber"/>

        <Profile>
          <img
            src={user.avatar_url}
            alt={user.name}
          />

          <div>
            <span>Bem-vindo,</span>
            <strong>{user.name}</strong>
          </div>
        </Profile>

        <button type="button" onClick={signOut}>
          <FiPower />
        </button>
      </HeaderContent>
    </Header>

    <Content>
      <Schedule>
        <h1>Horário agendados</h1>
        <p>
          <span>Hoje</span>
          <span>Dia 06</span>
          <span>Segunda-feira</span>
        </p>

        <NextAppointment>
          <strong>Atendimento a seguir</strong>

          <div>
            <img
              src="https://avatars3.githubusercontent.com/u/14303184?s=400&u=61fe9786fb1bde05b4edbeb887e29f9cc7a1850f&v=4"
              alt="Lucas Lourenço"
            />

            <strong>Lucas Lourenço</strong>
            <span>
              <FiClock />
              08:00
            </span>
          </div>
        </NextAppointment>

        <Section>
          <strong>Manhã</strong>

          <Appointment>
            <span>
              <FiClock />
              08:00
            </span>

            <div>
              <img
                src="https://avatars3.githubusercontent.com/u/14303184?s=400&u=61fe9786fb1bde05b4edbeb887e29f9cc7a1850f&v=4"
                alt="Lucas Lourenço"
              />

              <strong>Lucas Lourenço</strong>
            </div>
          </Appointment>

          <Appointment>
            <span>
              <FiClock />
              09:00
            </span>

            <div>
              <img
                src="https://avatars3.githubusercontent.com/u/14303184?s=400&u=61fe9786fb1bde05b4edbeb887e29f9cc7a1850f&v=4"
                alt="Lucas Lourenço"
              />

              <strong>Lucas Lourenço</strong>
            </div>
          </Appointment>
        </Section>

        <Section>
          <strong>Tarde</strong>

          <Appointment>
            <span>
              <FiClock />
              16:00
            </span>

            <div>
              <img
                src="https://avatars3.githubusercontent.com/u/14303184?s=400&u=61fe9786fb1bde05b4edbeb887e29f9cc7a1850f&v=4"
                alt="Lucas Lourenço"
              />

              <strong>Lucas Lourenço</strong>
            </div>
          </Appointment>
        </Section>
      </Schedule>
      <Calender>
        <DayPicker
          weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
          fromMonth={new Date()}
          disabledDays={[
            { daysOfWeek: [0, 6]}
          ]}
          modifiers={{
            available: { daysOfWeek: [1, 2, 3, 4, 5] },
          }}
          selectedDays={selectedDate}
          onDayClick={handleDateChange}
          months={[
            'Janeiro',
            'Fevereiro',
            'Março',
            'Abril',
            'Maio',
            'Junho',
            'Julho',
            'Agosto',
            'Setembro',
            'Outubro',
            'Novembro',
            'Dezembro',
          ]}
        />
      </Calender>
    </Content>

    </Container>
  )
}

export default Dashboard;
