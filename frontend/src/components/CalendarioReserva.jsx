import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";

/*
  Calendario de periodo (retirada -> devolucao) usado no fluxo de reserva.
  Componente proprio, sem dependencias externas, no tema aqua do projeto.

  Recebe e devolve datas no mesmo formato dos inputs datetime-local
  ("YYYY-MM-DDTHH:mm"), entao continua compativel com o backend.

  Props:
    retirada    string  ex.: "2026-06-20T09:00" ou ""
    devolucao   string  ex.: "2026-06-22T18:00" ou ""
    onChange    fn({ retirada, devolucao })
    invalido    bool    aplica destaque de erro na borda
*/

const MESES = [
  "Janeiro", "Fevereiro", "Marco", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];
const DIAS_SEMANA = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];

const pad = (n) => String(n).padStart(2, "0");
// Monta "YYYY-MM-DD" (mes 0-based) sem passar por Date para evitar fuso.
const ymd = (ano, mes, dia) => `${ano}-${pad(mes + 1)}-${pad(dia)}`;

// Quebra "YYYY-MM-DDTHH:mm" em { data, hora }.
const separar = (valor) => {
  if (!valor) return { data: "", hora: "" };
  const [data, hora = ""] = valor.split("T");
  return { data, hora: hora.slice(0, 5) };
};

const CalendarioReserva = ({ retirada, devolucao, onChange, invalido }) => {
  const inicio = separar(retirada);
  const fim = separar(devolucao);

  // Horas ficam em estado interno; o padrao cobre o caso comum (dia comercial).
  const [horaRetirada, setHoraRetirada] = useState(inicio.hora || "09:00");
  const [horaDevolucao, setHoraDevolucao] = useState(fim.hora || "18:00");

  // "Hoje" como string YYYY-MM-DD para bloquear datas passadas.
  const hoje = new Date();
  const hojeStr = ymd(hoje.getFullYear(), hoje.getMonth(), hoje.getDate());

  // Mes visivel: comeca no mes da retirada (se houver) ou no mes atual.
  const baseMes = inicio.data ? new Date(`${inicio.data}T00:00`) : hoje;
  const [visivel, setVisivel] = useState({
    ano: baseMes.getFullYear(),
    mes: baseMes.getMonth(),
  });

  // Grade do mes: lista de semanas, cada uma com 7 celulas (dia ou null).
  const semanas = useMemo(() => {
    const primeiro = new Date(visivel.ano, visivel.mes, 1);
    const totalDias = new Date(visivel.ano, visivel.mes + 1, 0).getDate();
    const deslocamento = primeiro.getDay(); // 0 = domingo

    const celulas = [];
    for (let i = 0; i < deslocamento; i++) celulas.push(null);
    for (let d = 1; d <= totalDias; d++) celulas.push(d);
    while (celulas.length % 7 !== 0) celulas.push(null);

    const linhas = [];
    for (let i = 0; i < celulas.length; i += 7) linhas.push(celulas.slice(i, i + 7));
    return linhas;
  }, [visivel]);

  const mudarMes = (delta) => {
    setVisivel((v) => {
      const d = new Date(v.ano, v.mes + delta, 1);
      return { ano: d.getFullYear(), mes: d.getMonth() };
    });
  };

  // Emite as duas datas completas para o componente pai.
  const emitir = (dataIni, dataFim, hIni, hFim) => {
    onChange({
      retirada: dataIni ? `${dataIni}T${hIni}` : "",
      devolucao: dataFim ? `${dataFim}T${hFim}` : "",
    });
  };

  const aoClicarDia = (dia) => {
    const data = ymd(visivel.ano, visivel.mes, dia);
    if (data < hojeStr) return; // nao permite datas passadas

    // Sem retirada, ou periodo ja completo -> recomeca a selecao.
    if (!inicio.data || (inicio.data && fim.data)) {
      emitir(data, "", horaRetirada, horaDevolucao);
      return;
    }
    // Tem retirada e o clique e anterior -> vira a nova retirada.
    if (data < inicio.data) {
      emitir(data, "", horaRetirada, horaDevolucao);
      return;
    }
    // Caso normal: fecha o periodo.
    emitir(inicio.data, data, horaRetirada, horaDevolucao);
  };

  const estadoDia = (dia) => {
    if (!dia) return "vazio";
    const data = ymd(visivel.ano, visivel.mes, dia);
    if (data < hojeStr) return "passado";
    if (data === inicio.data) return "inicio";
    if (data === fim.data) return "fim";
    if (inicio.data && fim.data && data > inicio.data && data < fim.data) return "meio";
    return "livre";
  };

  return (
    <div className={`cal-reserva ${invalido ? "cal-invalido" : ""}`}>
      <style>{`
        .cal-reserva {
          border: 1px solid #e2e8f0;
          background: #fff;
          user-select: none;
        }
        .cal-invalido { border-color: #dc3545; }
        .cal-head {
          display: flex; align-items: center; justify-content: space-between;
          padding: 12px 14px; border-bottom: 1px solid #edf2f7;
        }
        .cal-titulo { font-weight: 700; color: #2c7a7b; font-size: 0.95rem; }
        .cal-nav {
          border: none; background: #e6fffa; color: #2c7a7b;
          width: 30px; height: 30px; display: inline-flex;
          align-items: center; justify-content: center; cursor: pointer;
          transition: background .15s;
        }
        .cal-nav:hover { background: #b2f5ea; }
        .cal-grade { padding: 8px 10px 12px; }
        .cal-semana { display: grid; grid-template-columns: repeat(7, 1fr); }
        .cal-dow {
          text-align: center; font-size: 0.68rem; font-weight: 700;
          color: #a0aec0; padding: 6px 0; text-transform: uppercase;
        }
        .cal-dia {
          position: relative; border: none; background: transparent;
          aspect-ratio: 1 / 1; font-size: 0.85rem; cursor: pointer;
          color: #2d3748; transition: background .12s, color .12s;
        }
        .cal-dia:hover:not(:disabled) { background: #e6fffa; }
        .cal-dia:disabled { color: #cbd5e0; cursor: not-allowed; }
        .cal-dia.vazio { visibility: hidden; }
        .cal-dia.meio { background: #e6fffa; color: #2c7a7b; border-radius: 0; }
        .cal-dia.inicio, .cal-dia.fim {
          background: #38b2ac; color: #fff; font-weight: 700;
        }
        .cal-dia.inicio:hover, .cal-dia.fim:hover { background: #319795; }
        .cal-horas {
          display: grid; grid-template-columns: 1fr 1fr; gap: 0;
          border-top: 1px solid #edf2f7;
        }
        .cal-hora-bloco { padding: 10px 14px; }
        .cal-hora-bloco + .cal-hora-bloco { border-left: 1px solid #edf2f7; }
        .cal-hora-rotulo {
          font-size: 0.68rem; font-weight: 700; color: #718096;
          text-transform: uppercase; display: flex; align-items: center;
          gap: 4px; margin-bottom: 4px;
        }
        .cal-hora-input {
          border: 1px solid #e2e8f0; padding: 4px 6px; width: 100%;
          font-size: 0.9rem; color: #2d3748;
        }
        .cal-hora-input:focus { outline: none; border-color: #38b2ac; }
        .cal-resumo {
          padding: 8px 14px; font-size: 0.75rem; color: #718096;
          border-top: 1px solid #edf2f7; text-align: center;
        }
      `}</style>

      <div className="cal-head">
        <button
          type="button"
          className="cal-nav"
          onClick={() => mudarMes(-1)}
          aria-label="Mes anterior"
        >
          <ChevronLeft size={18} />
        </button>
        <span className="cal-titulo">
          {MESES[visivel.mes]} {visivel.ano}
        </span>
        <button
          type="button"
          className="cal-nav"
          onClick={() => mudarMes(1)}
          aria-label="Proximo mes"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="cal-grade">
        <div className="cal-semana">
          {DIAS_SEMANA.map((d) => (
            <div key={d} className="cal-dow">{d}</div>
          ))}
        </div>
        {semanas.map((semana, i) => (
          <div className="cal-semana" key={i}>
            {semana.map((dia, j) => {
              const estado = estadoDia(dia);
              return (
                <button
                  type="button"
                  key={j}
                  className={`cal-dia ${estado}`}
                  disabled={!dia || estado === "passado"}
                  onClick={() => dia && aoClicarDia(dia)}
                >
                  {dia || ""}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      <div className="cal-horas">
        <div className="cal-hora-bloco">
          <div className="cal-hora-rotulo">
            <Clock size={12} /> Hora da retirada
          </div>
          <input
            type="time"
            className="cal-hora-input"
            value={horaRetirada}
            onChange={(e) => {
              setHoraRetirada(e.target.value);
              emitir(inicio.data, fim.data, e.target.value, horaDevolucao);
            }}
          />
        </div>
        <div className="cal-hora-bloco">
          <div className="cal-hora-rotulo">
            <Clock size={12} /> Hora da devolucao
          </div>
          <input
            type="time"
            className="cal-hora-input"
            value={horaDevolucao}
            onChange={(e) => {
              setHoraDevolucao(e.target.value);
              emitir(inicio.data, fim.data, horaRetirada, e.target.value);
            }}
          />
        </div>
      </div>

      <div className="cal-resumo">
        {!inicio.data
          ? "Toque em um dia para a retirada"
          : !fim.data
          ? "Agora escolha o dia da devolucao"
          : "Periodo selecionado - toque novamente para refazer"}
      </div>
    </div>
  );
};

export default CalendarioReserva;
