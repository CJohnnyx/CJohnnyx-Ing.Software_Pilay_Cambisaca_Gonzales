# tests/test_crud.py

import pytest
from mockito import mock, when, unstub, verify # <-- Importar 'verify'
from datetime import datetime
from sqlalchemy.orm import Session, Query
from typing import List, Optional

import crud, models, schemas

@pytest.fixture
def mock_db_session():
    """Fixture que proporciona una sesión de base de datos mockeada para las pruebas."""
    db = mock(Session)
    yield db
    unstub() # Limpiar los mocks después de cada prueba

# --- Tests para Pacientes ---

def test_create_paciente(mock_db_session: Session):
    """
    Verifica que la función create_paciente guarda correctamente un nuevo paciente
    en la base de datos.
    """
    paciente_in = schemas.PacienteCreate(
        nombre="Juan",
        apellido="Perez",
        cedula="1234567890",
        telefono="0987654321",
        email="juan.perez@example.com"
    )

    # Simular el comportamiento de `refresh`: Asignar el ID al objeto pasado
    def simulate_refresh(obj_to_refresh):
        obj_to_refresh.id = 1
        return None

    when(mock_db_session).add(...).thenReturn(None)
    when(mock_db_session).commit().thenReturn(None)
    when(mock_db_session).refresh(...).thenAnswer(simulate_refresh)

    created_paciente = crud.create_paciente(db=mock_db_session, paciente=paciente_in)

    assert created_paciente.id == 1
    assert created_paciente.nombre == paciente_in.nombre
    assert created_paciente.email == paciente_in.email

    # Utilizar verify() para comprobar que los métodos fueron llamados
    verify(mock_db_session).add(...) # Verifica que add fue llamado con cualquier argumento
    verify(mock_db_session).commit() # Verifica que commit fue llamado
    verify(mock_db_session).refresh(...) # Verifica que refresh fue llamado con cualquier argumento

def test_get_paciente(mock_db_session: Session):
    """
    Verifica que la función get_paciente recupera un paciente existente por su ID.
    """
    paciente_data = models.Paciente(
        id=1,
        nombre="Juan",
        apellido="Perez",
        cedula="1234567890",
        telefono="0987654321",
        email="juan.perez@example.com"
    )

    mock_query_obj = mock(Query)
    when(mock_db_session).query(models.Paciente).thenReturn(mock_query_obj)
    when(mock_query_obj).filter(...).thenReturn(mock_query_obj)
    when(mock_query_obj).first().thenReturn(paciente_data)

    paciente = crud.get_paciente(mock_db_session, paciente_id=1)

    assert paciente is not None
    assert paciente.id == 1
    assert paciente.nombre == "Juan"


def test_get_paciente_not_found(mock_db_session: Session):
    """
    Verifica que get_paciente devuelve None si el paciente no se encuentra.
    """
    mock_query_obj = mock(Query)
    when(mock_db_session).query(models.Paciente).thenReturn(mock_query_obj)
    when(mock_query_obj).filter(...).thenReturn(mock_query_obj)
    when(mock_query_obj).first().thenReturn(None)

    paciente = crud.get_paciente(mock_db_session, paciente_id=999)

    assert paciente is None

def test_get_pacientes(mock_db_session: Session):
    """
    Verifica que get_pacientes recupera una lista de pacientes.
    """
    pacientes_data = [
        models.Paciente(id=1, nombre="Juan", apellido="Perez", cedula="1", telefono="1", email="j@e.com"),
        models.Paciente(id=2, nombre="Ana", apellido="Gomez", cedula="2", telefono="2", email="a@e.com")
    ]
    mock_query_obj = mock(Query)
    when(mock_db_session).query(models.Paciente).thenReturn(mock_query_obj)
    when(mock_query_obj).offset(0).thenReturn(mock_query_obj)
    when(mock_query_obj).limit(100).thenReturn(mock_query_obj)
    when(mock_query_obj).all().thenReturn(pacientes_data)

    pacientes = crud.get_pacientes(mock_db_session, skip=0, limit=100)

    assert len(pacientes) == 2
    assert pacientes[0].nombre == "Juan"
    assert pacientes[1].nombre == "Ana"

# --- Tests para Médicos ---

def test_create_medico(mock_db_session: Session):
    """
    Verifica que la función create_medico guarda correctamente un nuevo médico.
    """
    medico_in = schemas.MedicoCreate(
        nombre="Dr. Carlos",
        apellido="Lopez",
        especialidad="Cardiología",
        telefono="0912345678",
        email="carlos.lopez@example.com"
    )

    def simulate_refresh_medico(obj_to_refresh):
        obj_to_refresh.id = 101
        return None

    when(mock_db_session).add(...).thenReturn(None)
    when(mock_db_session).commit().thenReturn(None)
    when(mock_db_session).refresh(...).thenAnswer(simulate_refresh_medico)

    created_medico = crud.create_medico(db=mock_db_session, medico=medico_in)

    assert created_medico.id == 101
    assert created_medico.nombre == medico_in.nombre
    assert created_medico.especialidad == medico_in.especialidad
    verify(mock_db_session).add(...)
    verify(mock_db_session).commit()
    verify(mock_db_session).refresh(...)


def test_get_medico(mock_db_session: Session):
    """
    Verifica que la función get_medico recupera un médico existente por su ID.
    """
    medico_data = models.Medico(
        id=101,
        nombre="Dr. Carlos",
        apellido="Lopez",
        especialidad="Cardiología",
        telefono="0912345678",
        email="carlos.lopez@example.com"
    )
    mock_query_obj = mock(Query)
    when(mock_db_session).query(models.Medico).thenReturn(mock_query_obj)
    when(mock_query_obj).filter(...).thenReturn(mock_query_obj)
    when(mock_query_obj).first().thenReturn(medico_data)

    medico = crud.get_medico(mock_db_session, medico_id=101)

    assert medico is not None
    assert medico.id == 101
    assert medico.nombre == "Dr. Carlos"

def test_get_medicos(mock_db_session: Session):
    """
    Verifica que get_medicos recupera una lista de médicos.
    """
    medicos_data = [
        models.Medico(id=101, nombre="Carlos", apellido="Lopez", especialidad="Cardiología", telefono="1", email="c@e.com"),
        models.Medico(id=102, nombre="Maria", apellido="Garcia", especialidad="Pediatría", telefono="2", email="m@e.com")
    ]
    mock_query_obj = mock(Query)
    when(mock_db_session).query(models.Medico).thenReturn(mock_query_obj)
    when(mock_query_obj).offset(0).thenReturn(mock_query_obj)
    when(mock_query_obj).limit(100).thenReturn(mock_query_obj)
    when(mock_query_obj).all().thenReturn(medicos_data)

    medicos = crud.get_medicos(mock_db_session, skip=0, limit=100)

    assert len(medicos) == 2
    assert medicos[0].nombre == "Carlos"
    assert medicos[1].nombre == "Maria"

# --- Tests para Citas ---

def test_create_cita(mock_db_session: Session):
    """
    Verifica que la función create_cita guarda correctamente una nueva cita.
    """
    cita_in = schemas.CitaCreate(
        paciente_id=1,
        medico_id=101,
        fecha_hora=datetime(2025, 7, 15, 10, 0),
        motivo="Consulta de rutina",
        estado="Programada"
    )

    when(mock_db_session).add(...).thenReturn(None)
    when(mock_db_session).commit().thenReturn(None)
    
    def simulate_refresh_cita(obj_to_refresh):
        obj_to_refresh.id = 1001
        return None

    when(mock_db_session).refresh(...).thenAnswer(simulate_refresh_cita)

    created_cita = crud.create_cita(db=mock_db_session, cita=cita_in)

    assert created_cita.id == 1001
    assert created_cita.paciente_id == cita_in.paciente_id
    assert created_cita.medico_id == cita_in.medico_id
    assert created_cita.fecha_hora == cita_in.fecha_hora
    verify(mock_db_session).add(...)
    verify(mock_db_session).commit()
    verify(mock_db_session).refresh(...)


def test_get_cita(mock_db_session: Session):
    """
    Verifica que la función get_cita recupera una cita existente por su ID.
    """
    cita_data = models.Cita(
        id=1001,
        paciente_id=1,
        medico_id=101,
        fecha_hora=datetime(2025, 7, 15, 10, 0),
        motivo="Consulta de rutina",
        estado="Programada"
    )
    mock_query_obj = mock(Query)
    when(mock_db_session).query(models.Cita).thenReturn(mock_query_obj)
    when(mock_query_obj).filter(...).thenReturn(mock_query_obj)
    when(mock_query_obj).first().thenReturn(cita_data)

    cita = crud.get_cita(mock_db_session, cita_id=1001)

    assert cita is not None
    assert cita.id == 1001
    assert cita.motivo == "Consulta de rutina"

def test_get_citas(mock_db_session: Session):
    """
    Verifica que get_citas recupera una lista de citas.
    """
    citas_data = [
        models.Cita(id=1001, paciente_id=1, medico_id=101, fecha_hora=datetime(2025, 7, 15, 10, 0), motivo="Consulta", estado="Programada"),
        models.Cita(id=1002, paciente_id=2, medico_id=102, fecha_hora=datetime(2025, 7, 16, 11, 0), motivo="Seguimiento", estado="Realizada")
    ]
    mock_query_obj = mock(Query)
    when(mock_db_session).query(models.Cita).thenReturn(mock_query_obj)
    when(mock_query_obj).offset(0).thenReturn(mock_query_obj)
    when(mock_query_obj).limit(100).thenReturn(mock_query_obj)
    when(mock_query_obj).all().thenReturn(citas_data)

    citas = crud.get_citas(mock_db_session, skip=0, limit=100)

    assert len(citas) == 2
    assert citas[0].motivo == "Consulta"
    assert citas[1].motivo == "Seguimiento"