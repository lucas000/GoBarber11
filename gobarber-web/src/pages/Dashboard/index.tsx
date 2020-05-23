import React, { useState, useCallback, useEffect, useMemo } from 'react';
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
import api from '../../services/api';

interface MonthAvailabilityItem {
  day: number;
  available: boolean;
}

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const [monthAvailability, setMonthAvailability] = useState<MonthAvailabilityItem[]>([]);

  const handleDateChange = useCallback(
    (day: Date, modifiers: DayModifiers) => {
      if(modifiers.available){
        setSelectedDate(day);
      }
    },
    []
  );

  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month);
  }, []);

  useEffect(() => {
    api.get(`/providers/${user.id}/month-availability`, {
      params: {
        year: currentMonth.getFullYear(),
        month: currentMonth.getMonth() + 1,
      },
    }).then(response => {
      setMonthAvailability(response.data);
    });
  }, [currentMonth, user.id]);

  const disabledDays = useMemo(() => {
    const dates = monthAvailability
      .filter(monthDay => monthDay.available === false)
      .map(monthDay => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();

        return new Date(year, month, monthDay.day)
      });

      return dates;
  }, [currentMonth, monthAvailability]);

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
            { daysOfWeek: [0, 6]}, ...disabledDays
          ]}
          modifiers={{
            available: { daysOfWeek: [1, 2, 3, 4, 5] },
          }}
          selectedDays={selectedDate}
          onMonthChange={handleMonthChange}
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
