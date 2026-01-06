<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>LPD</title>
    <style>
        body { font-family: sans-serif; font-size: 12px; }
        .title { text-align:center; font-size:18px; font-weight:bold; margin-bottom:15px; }
        .box { border:1px solid #000; padding:10px; margin-bottom:10px; }
    </style>
</head>
<body>

<div class="title">LAPORAN PERTANGGUNGJAWABAN DINAS</div>

<div class="box">
    <b>Nomor Surat:</b> {{ $lpd->surat->nomor_surat }} <br>
    <b>Status:</b> {{ $lpd->surat->status }} <br>
    <b>Tanggal Mulai:</b> {{ $lpd->surat->tanggal_mulai }} <br>
    <b>Tanggal Selesai:</b> {{ $lpd->surat->tanggal_selesai }} <br>
</div>

<div class="box">
    <b>Hasil Kegiatan:</b><br>
    {!! nl2br(e($lpd->hasil_kegiatan)) !!}
</div>

<div class="box">
    <b>Petugas Terlibat:</b>
    <ul>
        @foreach($lpd->petugasLain as $p)
            <li>{{ $p->nama }} - {{ $p->jabatan }}</li>
        @endforeach
    </ul>
</div>

@if($lpd->dokumentasi)
    <div class="box">
        <b>Dokumentasi:</b><br>
        <img src="{{ public_path('storage/'.$lpd->dokumentasi) }}" width="250">
    </div>
@endif

</body>
</html>
