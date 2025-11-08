# jogo_cobrinha_tk.py
import random
import tkinter as tk
from collections import deque

# Cores (hex)
COR_FUNDO  = "#1c1c1c"
COR_GRADE  = "#282828"
COR_COBRA  = "#00aa00"
COR_CABECA = "#00c800"
COR_FRUTA  = "#c81e1e"
COR_TEXTO  = "#e6e6e6"


class JogoCobrinha(tk.Tk):
    """Jogo da cobrinha usando somente tkinter (stdlib)."""
    def __init__(self, largura=640, altura=480, tamanho_celula=20, velocidade=12):
        super().__init__()
        self.title("Jogo da Cobrinha (tkinter)")
        self.resizable(False, False)

        # Config
        self.largura = largura
        self.altura = altura
        self.tamanho_celula = tamanho_celula
        self.velocidade = max(1, velocidade)  # ticks/seg

        # Estado
        self.rodando = True
        self.pausa = False
        self.pontos = 0
        self.direcao = (1, 0)
        self.proxima_direcao = (1, 0)
        self.corpo_cobra = deque()
        self.fruta = None

        # UI
        self.canvas = tk.Canvas(self, width=self.largura, height=self.altura, bg=COR_FUNDO, highlightthickness=0)
        self.canvas.pack()
        self._reiniciar()

        # Teclado
        self.bind("<KeyPress>", self._on_key)

        # Loop (equivalente ao clock.tick do pygame)
        self._schedule_tick()

    # ---------- Lógica ----------
    def _reiniciar(self):
        self.pontos = 0
        self.direcao = (1, 0)
        self.proxima_direcao = (1, 0)
        self.corpo_cobra.clear()

        colunas = self.largura // self.tamanho_celula
        linhas = self.altura // self.tamanho_celula
        centro_coluna = colunas // 2
        centro_linha = linhas // 2

        for i in range(3, -1, -1):
            pos = ((centro_coluna - i) * self.tamanho_celula,
                   centro_linha * self.tamanho_celula)
            self.corpo_cobra.append(pos)

        self.fruta = self._gerar_fruta()
        self._desenhar()

    def _gerar_fruta(self):
        colunas = self.largura // self.tamanho_celula
        linhas = self.altura // self.tamanho_celula
        ocupadas = set(self.corpo_cobra)
        while True:
            coluna = random.randint(0, colunas - 1)
            linha = random.randint(0, linhas - 1)
            pos = (coluna * self.tamanho_celula, linha * self.tamanho_celula)
            if pos not in ocupadas:
                return pos

    def _atualizar_direcao(self, nova):
        if len(self.corpo_cobra) < 2:
            self.proxima_direcao = nova
            return
        dx, dy = self.proxima_direcao
        nx, ny = nova
        if (dx + nx, dy + ny) != (0, 0):  # evita 180º
            self.proxima_direcao = nova

    def _tick(self):
        if self.rodando and not self.pausa:
            self._atualizar()
        self._desenhar()
        self._schedule_tick()

    def _schedule_tick(self):
        intervalo_ms = max(10, int(1000 / self.velocidade))
        self.after(intervalo_ms, self._tick)

    def _atualizar(self):
        self.direcao = self.proxima_direcao
        cabeca_x, cabeca_y = self.corpo_cobra[0]
        nx = cabeca_x + self.direcao[0] * self.tamanho_celula
        ny = cabeca_y + self.direcao[1] * self.tamanho_celula
        nova_cabeca = (nx, ny)

        if (
            nx < 0 or nx >= self.largura or
            ny < 0 or ny >= self.altura or
            nova_cabeca in self.corpo_cobra
        ):
            self.pausa = True
            return

        self.corpo_cobra.appendleft(nova_cabeca)

        if nova_cabeca == self.fruta:
            self.pontos += 1
            self.fruta = self._gerar_fruta()
        else:
            self.corpo_cobra.pop()

    # ---------- Entrada ----------
    def _on_key(self, event):
        k = event.keysym
        if k in ("Up", "w", "W"):
            self._atualizar_direcao((0, -1))
        elif k in ("Down", "s", "S"):
            self._atualizar_direcao((0, 1))
        elif k in ("Left", "a", "A"):
            self._atualizar_direcao((-1, 0))
        elif k in ("Right", "d", "D"):
            self._atualizar_direcao((1, 0))
        elif k == "space":
            self.pausa = not self.pausa
        elif k in ("Return", "KP_Enter") and self.pausa:
            self._reiniciar()

    # ---------- Renderização ----------
    def _desenhar(self):
        c = self.canvas
        c.delete("all")

        # grade
        for x in range(0, self.largura, self.tamanho_celula):
            c.create_line(x, 0, x, self.altura, fill=COR_GRADE)
        for y in range(0, self.altura, self.tamanho_celula):
            c.create_line(0, y, self.largura, y, fill=COR_GRADE)

        # fruta
        fx, fy = self.fruta
        c.create_rectangle(
            fx, fy, fx + self.tamanho_celula, fy + self.tamanho_celula,
            fill=COR_FRUTA, outline=""
        )

        # cobra
        for i, (x, y) in enumerate(self.corpo_cobra):
            cor = COR_CABECA if i == 0 else COR_COBRA
            c.create_rectangle(
                x, y, x + self.tamanho_celula, y + self.tamanho_celula,
                fill=cor, outline=""
            )

        # painel
        msg = f"Pontos: {self.pontos}"
        if self.pausa:
            msg += "  |  ESPAÇO para continuar, ENTER para reiniciar"
        c.create_text(12, 18, text=msg, fill=COR_TEXTO, anchor="w", font=("TkDefaultFont", 12, "normal"))


def main():
    jogo = JogoCobrinha()
    jogo.mainloop()


if __name__ == "__main__":
    main()
