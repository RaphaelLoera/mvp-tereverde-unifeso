import { useEffect, useState } from "react";
import Button from "../Button";
import Input from "../Input";

type Trilha = {
  id: string;
  titulo: string;
  descricao: string;
  nivel: string;
  distanciaKm: number;
  diasDaTrilha: number;
  tempoAproximado: string;
  imagemBase64?: string | null;
  imagemNome?: string | null;
  createdAt: string;
};

type Evento = {
  id: string;
  titulo: string;
  descricao: string;
  endereco?: string | null;
  inicioEm?: string | null;
  fimEm?: string | null;
  encerrado: boolean;
  imagemBase64?: string | null;
  imagemNome?: string | null;
  createdAt: string;
};

type Usuario = {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
};

const formatarDataHoraInput = (valor?: string | null) =>
  valor && !Number.isNaN(new Date(valor).getTime())
    ? new Date(valor).toISOString().slice(0, 16)
    : "";

const formatarDataHoraExibicao = (valor?: string | null) =>
  valor && !Number.isNaN(new Date(valor).getTime())
    ? new Intl.DateTimeFormat("pt-BR", {
        dateStyle: "short",
        timeStyle: "short",
      }).format(new Date(valor))
    : "Sem data";

const eventoEstaEncerrado = (evento: Pick<Evento, "fimEm" | "encerrado">) =>
  evento.encerrado ||
  (evento.fimEm ? new Date(evento.fimEm) < new Date() : false);

const Admin = () => {
  const [descricao, setDescricao] = useState("");
  const [titulo, setTitulo] = useState("");
  const [nivel, setNivel] = useState("");
  const [distanciaKm, setDistanciaKm] = useState("");
  const [diasDaTrilha, setDiasDaTrilha] = useState("1");
  const [tempoAproximado, setTempoAproximado] = useState("");
  const [imagemPreview, setImagemPreview] = useState("");
  const [imagemNome, setImagemNome] = useState("");
  const [trilhas, setTrilhas] = useState<Trilha[]>([]);

  const [eventoTitulo, setEventoTitulo] = useState("");
  const [eventoDescricao, setEventoDescricao] = useState("");
  const [eventoEndereco, setEventoEndereco] = useState("");
  const [eventoInicioEm, setEventoInicioEm] = useState("");
  const [eventoFimEm, setEventoFimEm] = useState("");
  const [eventoImagemPreview, setEventoImagemPreview] = useState("");
  const [eventoImagemNome, setEventoImagemNome] = useState("");
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [eventoError, setEventoError] = useState("");
  const [eventoSuccess, setEventoSuccess] = useState("");
  const [usuariosError, setUsuariosError] = useState("");
  const [usuariosLoading, setUsuariosLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [eventoLoading, setEventoLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [eventoDeletingId, setEventoDeletingId] = useState<string | null>(null);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [pendingEventoDeleteId, setPendingEventoDeleteId] = useState<
    string | null
  >(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEventoModal, setShowEventoModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingEventoId, setEditingEventoId] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<
    "trilhas" | "eventos" | "usuarios"
  >("trilhas");

  const carregarTrilhas = async () => {
    try {
      const response = await fetch("http://localhost:3000/trilhas");
      if (!response.ok) {
        throw new Error("Falha ao carregar trilhas");
      }

      const data = (await response.json()) as Trilha[];
      setTrilhas(data);
    } catch {
      setError("Não foi possível atualizar a lista de trilhas.");
    }
  };

  const carregarEventos = async () => {
    try {
      const response = await fetch("http://localhost:3000/eventos");
      if (!response.ok) {
        throw new Error("Falha ao carregar eventos");
      }

      const data = (await response.json()) as Evento[];
      setEventos(data);
    } catch {
      setEventoError("Não foi possível atualizar a lista de eventos.");
    }
  };

  const carregarUsuarios = async () => {
    setUsuariosLoading(true);
    setUsuariosError("");

    try {
      const response = await fetch("http://localhost:3000/usuarios");
      if (!response.ok) {
        throw new Error("Falha ao carregar usuários");
      }

      const data = (await response.json()) as Usuario[];
      setUsuarios(data);
    } catch {
      setUsuariosError("Não foi possível atualizar a lista de usuários.");
    } finally {
      setUsuariosLoading(false);
    }
  };

  const alternarAdmin = async (usuario: Usuario, isAdmin: boolean) => {
    setUsuariosError("");

    try {
      const response = await fetch(
        `http://localhost:3000/usuarios/${usuario.id}/admin`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isAdmin }),
        },
      );

      if (!response.ok) {
        const responseText = await response.text().catch(() => "");
        throw new Error(responseText || "Falha ao atualizar usuário");
      }

      await carregarUsuarios();
    } catch {
      setUsuariosError(
        isAdmin
          ? "Não foi possível promover o usuário para admin."
          : "Não foi possível remover o admin do usuário.",
      );
    }
  };

  useEffect(() => {
    carregarTrilhas();
    carregarEventos();
    carregarUsuarios();
  }, []);

  const limparFormulario = () => {
    setTitulo("");
    setDescricao("");
    setNivel("");
    setDistanciaKm("");
    setDiasDaTrilha("1");
    setTempoAproximado("");
    setImagemPreview("");
    setImagemNome("");
  };

  const limparFormularioEvento = () => {
    setEventoTitulo("");
    setEventoDescricao("");
    setEventoEndereco("");
    setEventoInicioEm("");
    setEventoFimEm("");
    setEventoImagemPreview("");
    setEventoImagemNome("");
  };

  const abrirCadastro = () => {
    setEditingId(null);
    limparFormulario();
    setError("");
    setSuccess("");
    setShowCreateModal(true);
  };

  const abrirEventoCadastro = () => {
    setEditingEventoId(null);
    limparFormularioEvento();
    setEventoError("");
    setEventoSuccess("");
    setShowEventoModal(true);
  };

  const abrirEventoEdicao = (evento: Evento) => {
    setEditingEventoId(evento.id);
    setEventoTitulo(evento.titulo);
    setEventoDescricao(evento.descricao);
    setEventoEndereco(evento.endereco ?? "");
    setEventoInicioEm(formatarDataHoraInput(evento.inicioEm));
    setEventoFimEm(formatarDataHoraInput(evento.fimEm));
    setEventoImagemPreview(evento.imagemBase64 ?? "");
    setEventoImagemNome(evento.imagemNome ?? "");
    setEventoError("");
    setEventoSuccess("");
    setShowEventoModal(true);
  };

  const abrirEdicao = (trilha: Trilha) => {
    setEditingId(trilha.id);
    setTitulo(trilha.titulo);
    setDescricao(trilha.descricao);
    setNivel(trilha.nivel);
    setDistanciaKm(String(trilha.distanciaKm));
    setDiasDaTrilha(String(trilha.diasDaTrilha ?? 1));
    setTempoAproximado(trilha.tempoAproximado);
    setImagemPreview(trilha.imagemBase64 ?? "");
    setImagemNome(trilha.imagemNome ?? "");
    setError("");
    setSuccess("");
    setShowCreateModal(true);
  };

  const handleImagemChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;

    if (!file) {
      setImagemPreview("");
      setImagemNome("");
      return;
    }

    setImagemNome(file.name);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagemPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleEventoImagemChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0] ?? null;

    if (!file) {
      setEventoImagemPreview("");
      setEventoImagemNome("");
      return;
    }

    setEventoImagemNome(file.name);

    const reader = new FileReader();
    reader.onloadend = () => {
      setEventoImagemPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (
      !titulo ||
      !descricao ||
      !nivel ||
      !distanciaKm ||
      !diasDaTrilha ||
      !tempoAproximado
    ) {
      setError("Preencha todos os campos para cadastrar a trilha.");
      return;
    }

    if (!imagemPreview) {
      setError("Selecione uma imagem para a trilha.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        editingId
          ? `http://localhost:3000/trilhas/${editingId}`
          : "http://localhost:3000/trilhas",
        {
          method: editingId ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            titulo,
            descricao,
            nivel,
            distanciaKm,
            diasDaTrilha: Number(diasDaTrilha),
            tempoAproximado,
            imagemNome,
            imagemBase64: imagemPreview,
          }),
        },
      );

      if (!response.ok) {
        const responseText = await response.text().catch(() => "");
        throw new Error(responseText || "Falha ao cadastrar trilha");
      }

      setSuccess(
        editingId
          ? "Trilha atualizada com sucesso."
          : "Trilha cadastrada com sucesso.",
      );
      limparFormulario();
      setEditingId(null);
      setShowCreateModal(false);
      await carregarTrilhas();
    } catch (submitError) {
      const message =
        submitError instanceof Error
          ? submitError.message
          : editingId
            ? "Não foi possível atualizar a trilha."
            : "Não foi possível cadastrar a trilha.";
      setError(
        message === "Falha ao cadastrar trilha" ||
          message === "Falha ao atualizar trilha"
          ? editingId
            ? "Não foi possível atualizar a trilha."
            : "Não foi possível cadastrar a trilha."
          : message,
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEventoSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    setEventoError("");
    setEventoSuccess("");

    if (
      !eventoTitulo ||
      !eventoDescricao ||
      !eventoEndereco ||
      !eventoInicioEm ||
      !eventoFimEm ||
      !eventoImagemPreview
    ) {
      setEventoError("Preencha todos os campos para cadastrar o evento.");
      return;
    }

    if (new Date(eventoFimEm) < new Date(eventoInicioEm)) {
      setEventoError("A data final precisa ser posterior ao início do evento.");
      return;
    }

    setEventoLoading(true);

    try {
      const response = await fetch(
        editingEventoId
          ? `http://localhost:3000/eventos/${editingEventoId}`
          : "http://localhost:3000/eventos",
        {
          method: editingEventoId ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            titulo: eventoTitulo,
            descricao: eventoDescricao,
            endereco: eventoEndereco,
            inicioEm: eventoInicioEm,
            fimEm: eventoFimEm,
            imagemNome: eventoImagemNome,
            imagemBase64: eventoImagemPreview,
          }),
        },
      );

      if (!response.ok) {
        const responseText = await response.text().catch(() => "");
        throw new Error(responseText || "Falha ao salvar evento");
      }

      setEventoSuccess(
        editingEventoId
          ? "Evento atualizado com sucesso."
          : "Evento cadastrado com sucesso.",
      );
      limparFormularioEvento();
      setEditingEventoId(null);
      setShowEventoModal(false);
      await carregarEventos();
    } catch (submitError) {
      const message =
        submitError instanceof Error
          ? submitError.message
          : editingEventoId
            ? "Não foi possível atualizar o evento."
            : "Não foi possível cadastrar o evento.";
      setEventoError(
        message === "Falha ao salvar evento"
          ? editingEventoId
            ? "Não foi possível atualizar o evento."
            : "Não foi possível cadastrar o evento."
          : message,
      );
    } finally {
      setEventoLoading(false);
    }
  };

  const solicitarExclusao = (id: string) => {
    setError("");
    setSuccess("");
    setPendingDeleteId(id);
  };

  const solicitarEventoExclusao = (id: string) => {
    setEventoError("");
    setEventoSuccess("");
    setPendingEventoDeleteId(id);
  };

  const fecharConfirmacao = () => {
    setPendingDeleteId(null);
  };

  const fecharEventoConfirmacao = () => {
    setPendingEventoDeleteId(null);
  };

  const fecharModal = () => {
    setShowCreateModal(false);
    setEditingId(null);
    limparFormulario();
  };

  const fecharEventoModal = () => {
    setShowEventoModal(false);
    setEditingEventoId(null);
    limparFormularioEvento();
  };

  const confirmarExclusao = async () => {
    if (!pendingDeleteId) {
      return;
    }

    const id = pendingDeleteId;
    setDeletingId(id);
    setError("");
    setSuccess("");
    setPendingDeleteId(null);

    try {
      const response = await fetch(`http://localhost:3000/trilhas/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const responseText = await response.text().catch(() => "");
        throw new Error(responseText || "Falha ao excluir trilha");
      }

      setSuccess("Trilha excluída com sucesso.");
      await carregarTrilhas();
    } catch (deleteError) {
      const message =
        deleteError instanceof Error
          ? deleteError.message
          : "Não foi possível excluir a trilha.";
      setError(
        message === "Falha ao excluir trilha"
          ? "Não foi possível excluir a trilha."
          : message,
      );
    } finally {
      setDeletingId(null);
    }
  };

  const confirmarEventoExclusao = async () => {
    if (!pendingEventoDeleteId) {
      return;
    }

    const id = pendingEventoDeleteId;
    setEventoDeletingId(id);
    setEventoError("");
    setEventoSuccess("");
    setPendingEventoDeleteId(null);

    try {
      const response = await fetch(`http://localhost:3000/eventos/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const responseText = await response.text().catch(() => "");
        throw new Error(responseText || "Falha ao excluir evento");
      }

      setEventoSuccess("Publicação excluída com sucesso.");
      await carregarEventos();
    } catch (deleteError) {
      const message =
        deleteError instanceof Error
          ? deleteError.message
          : "Não foi possível excluir a publicação.";
      setEventoError(
        message === "Falha ao excluir evento"
          ? "Não foi possível excluir a publicação."
          : message,
      );
    } finally {
      setEventoDeletingId(null);
    }
  };

  const trilhaSelecionada = pendingDeleteId
    ? trilhas.find((trilha) => trilha.id === pendingDeleteId)
    : null;

  return (
    <main className="flex-1 bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.12),transparent_28%),linear-gradient(180deg,#07111d_0%,#04070d_55%,#02050a_100%)] px-4 py-8 text-slate-100 sm:px-6 lg:px-8 lg:py-10">
      {showCreateModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/65 px-4 py-6 backdrop-blur-sm">
          <div className="w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-slate-950/95 shadow-[0_24px_70px_rgba(16,185,129,0.18)]">
            <div className="flex items-center justify-between border-b border-white/10 px-3.5 py-2 md:px-4">
              <div>
                <span className="text-xs font-semibold tracking-[0.22em] text-emerald-200 uppercase">
                  {editingId ? "Edição" : "Cadastro"}
                </span>
                <h2 className="mt-1 text-base font-semibold text-white">
                  {editingId ? "Editar trilha" : "Nova trilha"}
                </h2>
              </div>
              <button
                type="button"
                onClick={fecharModal}
                className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-xs font-medium text-slate-300 transition-colors duration-200 hover:bg-emerald-400 hover:text-slate-950"
              >
                Fechar
              </button>
            </div>

            <form onSubmit={handleSubmit} className="grid gap-2 p-3 md:p-3.5">
              <div className="grid gap-2 md:grid-cols-2">
                <Input
                  placeholder="Título da trilha"
                  value={titulo}
                  onChange={(event) => setTitulo(event.target.value)}
                />
                <Input
                  placeholder="Descrição da trilha"
                  value={descricao}
                  onChange={(event) => setDescricao(event.target.value)}
                />
                <Input
                  placeholder="Nível da trilha"
                  value={nivel}
                  onChange={(event) => setNivel(event.target.value)}
                />
              </div>

              <div className="grid gap-2 md:grid-cols-2">
                <Input
                  placeholder="Distância em km"
                  type="number"
                  step="0.1"
                  min="0"
                  value={distanciaKm}
                  onChange={(event) => setDistanciaKm(event.target.value)}
                />
                <Input
                  placeholder="Dias de trilha"
                  type="number"
                  min="1"
                  step="1"
                  value={diasDaTrilha}
                  onChange={(event) => setDiasDaTrilha(event.target.value)}
                />
                <Input
                  placeholder="Tempo total aproximado"
                  value={tempoAproximado}
                  onChange={(event) => setTempoAproximado(event.target.value)}
                />
              </div>

              <div className="rounded-lg border border-white/10 bg-white/5 p-2">
                <label className="mb-1 block text-sm font-medium text-white">
                  Imagem da trilha
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImagemChange}
                  className="w-full cursor-pointer rounded-md border border-white/10 bg-slate-950/70 px-3 py-1.5 text-sm text-slate-200 file:mr-4 file:cursor-pointer file:border-0 file:bg-emerald-400 file:px-3 file:py-1 file:font-medium file:text-slate-950 hover:file:bg-emerald-300"
                />
                {imagemPreview ? (
                  <div className="mt-2 overflow-hidden rounded-lg border border-white/10">
                    <img
                      src={imagemPreview}
                      alt="Preview da trilha"
                      className="h-24 w-full object-cover"
                    />
                  </div>
                ) : null}
              </div>

              <div className="flex flex-col gap-1.5 sm:flex-row">
                <Button
                  title={
                    loading
                      ? editingId
                        ? "Salvando..."
                        : "Cadastrando..."
                      : editingId
                        ? "Salvar alterações"
                        : "Cadastrar trilha"
                  }
                  type="submit"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={fecharModal}
                  className="inline-flex w-full items-center justify-center rounded-md border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white transition-colors duration-200 hover:bg-white/10"
                >
                  Cancelar
                </button>
              </div>

              {error ? (
                <p className="text-sm text-rose-600">{error}</p>
              ) : success ? (
                <p className="text-sm text-emerald-100">{success}</p>
              ) : null}
            </form>
          </div>
        </div>
      ) : null}

      {showEventoModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/65 px-4 py-6 backdrop-blur-sm">
          <div className="w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-slate-950/95 shadow-[0_24px_70px_rgba(16,185,129,0.18)]">
            <div className="flex items-center justify-between border-b border-white/10 px-3.5 py-2 md:px-4">
              <div>
                <span className="text-xs font-semibold tracking-[0.22em] text-emerald-200 uppercase">
                  {editingEventoId ? "Edição" : "Cadastro"}
                </span>
                <h2 className="mt-1 text-base font-semibold text-white">
                  {editingEventoId ? "Editar evento" : "Novo evento"}
                </h2>
              </div>
              <button
                type="button"
                onClick={fecharEventoModal}
                className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-xs font-medium text-slate-300 transition-colors duration-200 hover:bg-emerald-400 hover:text-slate-950"
              >
                Fechar
              </button>
            </div>

            <form
              onSubmit={handleEventoSubmit}
              className="grid gap-2 p-3 md:p-3.5"
            >
              <div className="grid gap-2 md:grid-cols-2">
                <Input
                  placeholder="Título do evento"
                  value={eventoTitulo}
                  onChange={(event) => setEventoTitulo(event.target.value)}
                />
                <Input
                  placeholder="Descrição do evento"
                  value={eventoDescricao}
                  onChange={(event) => setEventoDescricao(event.target.value)}
                />
                <Input
                  placeholder="Endereço"
                  value={eventoEndereco}
                  onChange={(event) => setEventoEndereco(event.target.value)}
                />
                <Input
                  placeholder="Início do evento"
                  type="datetime-local"
                  value={eventoInicioEm}
                  onChange={(event) => setEventoInicioEm(event.target.value)}
                />
                <Input
                  placeholder="Fim do evento"
                  type="datetime-local"
                  value={eventoFimEm}
                  onChange={(event) => setEventoFimEm(event.target.value)}
                />
              </div>

              <div className="rounded-lg border border-white/10 bg-white/5 p-2">
                <label className="mb-1 block text-sm font-medium text-white">
                  Imagem do evento
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleEventoImagemChange}
                  className="w-full cursor-pointer rounded-md border border-white/10 bg-slate-950/70 px-3 py-1.5 text-sm text-slate-200 file:mr-4 file:cursor-pointer file:border-0 file:bg-emerald-400 file:px-3 file:py-1 file:font-medium file:text-slate-950 hover:file:bg-emerald-300"
                />
                {eventoImagemPreview ? (
                  <div className="mt-2 overflow-hidden rounded-lg border border-white/10">
                    <img
                      src={eventoImagemPreview}
                      alt="Preview do evento"
                      className="h-24 w-full object-cover"
                    />
                  </div>
                ) : null}
              </div>

              <div className="flex flex-col gap-1.5 sm:flex-row">
                <Button
                  title={
                    eventoLoading
                      ? editingEventoId
                        ? "Salvando..."
                        : "Cadastrando..."
                      : editingEventoId
                        ? "Salvar alterações"
                        : "Cadastrar evento"
                  }
                  type="submit"
                  disabled={eventoLoading}
                />
                <button
                  type="button"
                  onClick={fecharEventoModal}
                  className="inline-flex w-full items-center justify-center rounded-md border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white transition-colors duration-200 hover:bg-white/10"
                >
                  Cancelar
                </button>
              </div>

              {eventoError ? (
                <p className="text-sm text-rose-600">{eventoError}</p>
              ) : eventoSuccess ? (
                <p className="text-sm text-emerald-100">{eventoSuccess}</p>
              ) : null}
            </form>
          </div>
        </div>
      ) : null}

      {pendingDeleteId ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/65 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-950/95 p-6 shadow-[0_30px_80px_rgba(16,185,129,0.28)]">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-rose-500/10 text-2xl text-rose-200">
              !
            </div>
            <h2 className="text-center text-xl font-semibold text-white">
              Confirmar exclusão
            </h2>
            <p className="mt-3 text-center text-sm leading-6 text-slate-300">
              Você tem certeza que deseja excluir
              {trilhaSelecionada
                ? ` a trilha “${trilhaSelecionada.titulo}”`
                : " esta trilha"}
              ?
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={fecharConfirmacao}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white transition-colors duration-200 hover:bg-white/10"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={confirmarExclusao}
                className="w-full rounded-lg border border-rose-300/20 bg-rose-500/10 px-4 py-3 text-sm font-medium text-rose-100 transition-colors duration-200 hover:bg-rose-500/20"
              >
                Excluir agora
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {pendingEventoDeleteId ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/65 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-950/95 p-6 shadow-[0_30px_80px_rgba(16,185,129,0.28)]">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-rose-500/10 text-2xl text-rose-200">
              !
            </div>
            <h2 className="text-center text-xl font-semibold text-white">
              Confirmar exclusão
            </h2>
            <p className="mt-3 text-center text-sm leading-6 text-slate-300">
              Você tem certeza que deseja excluir esta publicação?
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={fecharEventoConfirmacao}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white transition-colors duration-200 hover:bg-white/10"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={confirmarEventoExclusao}
                className="w-full rounded-lg border border-rose-300/20 bg-rose-500/10 px-4 py-3 text-sm font-medium text-rose-100 transition-colors duration-200 hover:bg-rose-500/20"
              >
                Excluir agora
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <section className="mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-[240px_minmax(0,1fr)]">
        <aside className="h-fit rounded-3xl border border-white/10 bg-slate-950/70 p-4 shadow-[0_20px_60px_rgba(15,23,42,0.24)] backdrop-blur-xl md:p-5 lg:sticky lg:top-6">
          <span className="text-xs font-semibold tracking-[0.22em] text-emerald-200 uppercase">
            Menu
          </span>

          <div className="mt-5 flex flex-col gap-3">
            <button
              type="button"
              onClick={() => setActiveSection("trilhas")}
              className={`inline-flex w-full items-center justify-center rounded-xl border px-4 py-3 text-sm font-medium transition-colors duration-200 hover:bg-emerald-700 hover:text-white ${
                activeSection === "trilhas"
                  ? "border-emerald-300/30 bg-emerald-400/10 text-emerald-100"
                  : "border-white/10 bg-white/5 text-white"
              }`}
            >
              Trilhas
            </button>
            <button
              type="button"
              onClick={() => setActiveSection("eventos")}
              className={`inline-flex w-full items-center justify-center rounded-xl border px-4 py-3 text-sm font-medium transition-colors duration-200 hover:bg-emerald-700 hover:text-white ${
                activeSection === "eventos"
                  ? "border-emerald-300/30 bg-emerald-400/10 text-emerald-100"
                  : "border-white/10 bg-white/5 text-white"
              }`}
            >
              Eventos
            </button>
            <button
              type="button"
              onClick={() => setActiveSection("usuarios")}
              className={`inline-flex w-full items-center justify-center rounded-xl border px-4 py-3 text-sm font-medium transition-colors duration-200 hover:bg-emerald-700 hover:text-white ${
                activeSection === "usuarios"
                  ? "border-emerald-300/30 bg-emerald-400/10 text-emerald-100"
                  : "border-white/10 bg-white/5 text-white"
              }`}
            >
              Usuários
            </button>
          </div>
        </aside>

        {activeSection === "trilhas" ? (
          <aside className="rounded-3xl border border-white/10 bg-slate-950/70 p-4 shadow-[0_20px_60px_rgba(15,23,42,0.24)] backdrop-blur-xl md:p-5">
            <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <span className="text-xs font-semibold tracking-[0.22em] text-emerald-200 uppercase">
                  Trilhas
                </span>
                <h2 className="mt-1 text-xl font-semibold text-white">
                  Publicadas no site
                </h2>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <button
                  type="button"
                  onClick={abrirCadastro}
                  className="rounded-lg border border-emerald-300/30 bg-emerald-400/10 px-4 py-2 text-xs font-medium text-emerald-100 transition-colors duration-200 hover:bg-emerald-400/20"
                >
                  Cadastro de trilhas
                </button>
                <button
                  type="button"
                  onClick={carregarTrilhas}
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-white transition-colors duration-200 hover:bg-white/10"
                >
                  Atualizar
                </button>
              </div>
            </div>

            <div>
              {trilhas.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-white/10 bg-white/5 p-4 text-sm text-slate-300">
                  Nenhuma trilha cadastrada ainda.
                </div>
              ) : (
                <ul className="grid gap-3">
                  {trilhas.map((trilha) => (
                    <li
                      key={trilha.id}
                      className="overflow-hidden rounded-2xl border border-white/10 bg-slate-950/70 shadow-[0_20px_50px_rgba(15,23,42,0.24)]"
                    >
                      <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
                        {trilha.imagemBase64 ? (
                          <img
                            src={trilha.imagemBase64}
                            alt={trilha.imagemNome ?? trilha.descricao}
                            className="h-24 w-full rounded-xl object-cover sm:w-28"
                          />
                        ) : null}

                        <div className="flex min-w-0 flex-1 flex-col gap-2">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="truncate text-base font-semibold text-white">
                              {trilha.titulo}
                            </h3>
                            <span className="rounded-full bg-emerald-400/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-100 uppercase">
                              {trilha.nivel}
                            </span>
                          </div>

                          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs leading-5 text-slate-300">
                            <span>Distância: {trilha.distanciaKm} km</span>
                            <span>
                              Dias de trilha:{" "}
                              {trilha.diasDaTrilha === 1
                                ? "1 dia"
                                : `${trilha.diasDaTrilha} dias`}
                            </span>
                            <span>
                              Tempo total aproximado: {trilha.tempoAproximado}
                            </span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => abrirEdicao(trilha)}
                          className="inline-flex shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-white transition-colors duration-200 hover:bg-white/10"
                        >
                          Editar trilha
                        </button>

                        <button
                          type="button"
                          onClick={() => solicitarExclusao(trilha.id)}
                          disabled={deletingId === trilha.id}
                          className="inline-flex shrink-0 items-center justify-center rounded-lg border border-rose-300/20 bg-rose-500/10 px-3 py-2 text-xs font-medium text-rose-100 transition-colors duration-200 hover:bg-rose-500/20 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {deletingId === trilha.id
                            ? "Excluindo..."
                            : "Excluir publicação"}
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </aside>
        ) : activeSection === "usuarios" ? (
          <aside className="rounded-3xl border border-white/10 bg-slate-950/70 p-4 shadow-[0_20px_60px_rgba(15,23,42,0.24)] backdrop-blur-xl md:p-5">
            <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <span className="text-xs font-semibold tracking-[0.22em] text-emerald-200 uppercase">
                  Usuários
                </span>
                <h2 className="mt-1 text-xl font-semibold text-white">
                  Administradores e usuários comuns
                </h2>
              </div>
              <button
                type="button"
                onClick={carregarUsuarios}
                disabled={usuariosLoading}
                className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-white transition-colors duration-200 hover:bg-white/10"
              >
                {usuariosLoading ? "Atualizando..." : "Atualizar"}
              </button>
            </div>

            {usuariosError ? (
              <div className="rounded-2xl border border-rose-300/20 bg-rose-500/10 p-4 text-sm text-rose-100">
                {usuariosError}
              </div>
            ) : usuarios.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-white/10 bg-white/5 p-4 text-sm text-slate-300">
                Nenhum usuário encontrado.
              </div>
            ) : (
              <ul className="grid gap-3">
                {usuarios.map((usuario) => (
                  <li
                    key={usuario.id}
                    className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-slate-950/70 p-4 shadow-[0_20px_50px_rgba(15,23,42,0.24)] sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="min-w-0">
                      <h3 className="truncate text-base font-semibold text-white">
                        {usuario.name}
                      </h3>
                      <p className="truncate text-sm text-slate-300">
                        {usuario.email}
                      </p>
                    </div>

                    <span
                      className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-semibold uppercase ${
                        usuario.isAdmin
                          ? "bg-emerald-400/10 text-emerald-100"
                          : "bg-slate-100/10 text-slate-200"
                      }`}
                    >
                      {usuario.isAdmin ? "Admin" : "Usuário"}
                    </span>

                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => alternarAdmin(usuario, true)}
                        disabled={usuario.isAdmin}
                        className="inline-flex items-center justify-center rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-white transition-colors duration-200 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        Tornar admin
                      </button>
                      <button
                        type="button"
                        onClick={() => alternarAdmin(usuario, false)}
                        disabled={!usuario.isAdmin}
                        className="inline-flex items-center justify-center rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-white transition-colors duration-200 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        Remover admin
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </aside>
        ) : (
          <aside className="rounded-3xl border border-white/10 bg-slate-950/70 p-4 shadow-[0_20px_60px_rgba(15,23,42,0.24)] backdrop-blur-xl md:p-5">
            <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <span className="text-xs font-semibold tracking-[0.22em] text-emerald-200 uppercase">
                  Eventos
                </span>
                <h2 className="mt-1 text-xl font-semibold text-white">
                  Publicações do site
                </h2>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <button
                  type="button"
                  onClick={abrirEventoCadastro}
                  className="rounded-lg border border-emerald-300/30 bg-emerald-400/10 px-4 py-2 text-xs font-medium text-emerald-100 transition-colors duration-200 hover:bg-emerald-400/20"
                >
                  Cadastro de publicações
                </button>
                <button
                  type="button"
                  onClick={carregarEventos}
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-white transition-colors duration-200 hover:bg-white/10"
                >
                  Atualizar
                </button>
              </div>
            </div>

            <div>
              {eventos.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-white/10 bg-white/5 p-4 text-sm text-slate-300">
                  Nenhuma publicação cadastrada ainda.
                </div>
              ) : (
                <ul className="grid gap-3">
                  {eventos.map((evento) => (
                    <li
                      key={evento.id}
                      className="overflow-hidden rounded-2xl border border-white/10 bg-slate-950/70 shadow-[0_20px_50px_rgba(15,23,42,0.24)]"
                    >
                      <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
                        {evento.imagemBase64 ? (
                          <img
                            src={evento.imagemBase64}
                            alt={evento.imagemNome ?? evento.titulo}
                            className="h-24 w-full rounded-xl object-cover sm:w-28"
                          />
                        ) : null}

                        <div className="flex min-w-0 flex-1 flex-col gap-2">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="truncate text-base font-semibold text-white">
                              {evento.titulo}
                            </h3>
                            <span
                              className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase ${eventoEstaEncerrado(evento) ? "bg-slate-100/10 text-slate-200" : "bg-emerald-400/10 text-emerald-100"}`}
                            >
                              {eventoEstaEncerrado(evento)
                                ? "Encerrado"
                                : "Em andamento"}
                            </span>
                          </div>
                          <p className="text-xs leading-5 text-slate-300">
                            {evento.descricao}
                          </p>
                          <div className="grid gap-1 text-xs leading-5 text-slate-300">
                            <span>Endereço: {evento.endereco}</span>
                            <span>
                              Início:{" "}
                              {formatarDataHoraExibicao(evento.inicioEm)}
                            </span>
                            <span>
                              Fim: {formatarDataHoraExibicao(evento.fimEm)}
                            </span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => abrirEventoEdicao(evento)}
                          className="inline-flex shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-white transition-colors duration-200 hover:bg-white/10"
                        >
                          Editar evento
                        </button>

                        <button
                          type="button"
                          onClick={() => solicitarEventoExclusao(evento.id)}
                          disabled={eventoDeletingId === evento.id}
                          className="inline-flex shrink-0 items-center justify-center rounded-lg border border-rose-300/20 bg-rose-500/10 px-3 py-2 text-xs font-medium text-rose-100 transition-colors duration-200 hover:bg-rose-500/20 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {eventoDeletingId === evento.id
                            ? "Excluindo..."
                            : "Excluir evento"}
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </aside>
        )}
      </section>
    </main>
  );
};

export default Admin;
