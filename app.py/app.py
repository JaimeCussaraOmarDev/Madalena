from ursina import *
import cv2
import mediapipe as mp
import threading

app = Ursina()

arvore = Entity(model='cube', color=color.green, scale=(1, 2, 1), position=(0, 0, 0))
tronco = Entity(model='cube', color=color.brown, scale=(0.3, 1, 0.3), position=(0, -1.5, 0))
mundo_3d = Entity(children=[arvore, tronco])

mp_hands = mp.solutions.hands
hands = mp_hands.Hands(max_num_hands=1, min_detection_confidence=0.7)
mp_draw = mp.solutions.drawing_utils

posicao_mao_x = 0
posicao_mao_y = 0

def detetar_maos():
    global posicao_mao_x, posicao_mao_y
    cap = cv2.VideoCapture(0)

    while cap.isOpened():
        sucesso, frame = cap.read()
        if not sucesso:
            break

        frame = cv2.flip(frame, 1)
        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        resultado = hands.process(rgb_frame)

        if resultado.multi_hand_landmarks:
            for hand_landmarks in resultado.multi_hand_landmarks:
                indicador = hand_landmarks.landmark[8]
                posicao_mao_x = (indicador.x - 0.5) * 10
                posicao_mao_y = -(indicador.y - 0.5) * 10
                mp_draw.draw_landmarks(frame, hand_landmarks, mp_hands.HAND_CONNECTIONS)

        cv2.imshow("Camara - Controlo por Gestos", frame)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()

thread_camara = threading.Thread(target=detetar_maos, daemon=True)
thread_camara.start()

def update():
    global posicao_mao_x, posicao_mao_y
    mundo_3d.x = lerp(mundo_3d.x, posicao_mao_x, time.dt * 5)
    mundo_3d.y = lerp(mundo_3d.y, posicao_mao_y, time.dt * 5)
    mundo_3d.rotation_y += 10 * time.dt

app.run()