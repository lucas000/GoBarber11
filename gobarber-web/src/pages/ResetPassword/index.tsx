import React, { useRef, useCallback } from 'react';

import { FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useHistory, useLocation } from 'react-router-dom';

import { useToast } from '../../hooks/toast';

import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, AnimationContainer, Background } from './styles';
import api from '../../services/api';

interface ResetPasswordFormData {
  password: string;
  confirmation_password: string;
}

const ResetPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();
  const history = useHistory();
  const location = useLocation();

  const handleSubmit = useCallback(async (data: ResetPasswordFormData) => {

    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        password: Yup.string()
          .required('Senha obrigatória'),
        confirmation_password: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Confirmação incorreta')
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const { password, confirmation_password } = data;
      const token = location.search.replace('?token=', '');

      if(!token) {
        throw new Error();
      };

      await api.post('/password/reset', {
        password,
        confirmation_password,
        token,
      });

      history.push('/');
    } catch (error) {
      if (error instanceof Yup.ValidationError){
        const errors = getValidationErrors(error);

        formRef.current?.setErrors(errors);

        return;
      }

      addToast({
        type: 'error',
        title: 'Error ao resetar senha',
        description: 'Ocorreu um erro ao resetar sua senha, tente novamente.',
      });
    }
  }, [addToast, history, location.search]);

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber"/>

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Resetar senha</h1>

            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Nova senha"
            />

            <Input
              name="confirmation_password"
              icon={FiLock}
              type="password"
              placeholder="Confirmação da senha"
            />

            <Button type="submit">Alterar senha</Button>
          </Form>
        </AnimationContainer>
      </Content>

      <Background />
    </Container>
  );
};

export default ResetPassword;
